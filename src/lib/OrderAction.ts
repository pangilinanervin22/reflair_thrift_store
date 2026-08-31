'use server'

import prisma from "@/db/prisma";
import { Prisma, type OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { revalidateStorefront } from "./revalidateStorefront";
import { requireAdmin, requireUser } from "./auth";
import { fail, ok, type ActionResult } from "./actionResult";
import { ObjectIdSchema, firstIssue } from "./schemas/common";
import { OrderAdminUpdateSchema, type OrderAdminUpdateInput } from "./schemas/order";
import { canTransition } from "./orderStatus";
import { SHIPPING_FEE } from "./constants";
import { snapshotItems } from "./orderItems";

/** Thrown inside the checkout transaction when a piece was sold between render and submit. */
class CheckoutRace extends Error {
    constructor() {
        super("checkout race");
        this.name = "CheckoutRace";
    }
}

function revalidateOrderViews() {
    revalidatePath('/account/order');
    revalidatePath('/admin/order');
    revalidatePath('/admin/order/[slug]', 'page');
}

/** Sets an order's status (and ship date / cancel reason) and, when cancelling, releases its pieces — atomically. */
async function applyStatus(orderId: string, status: OrderStatus, shipDate?: Date, cancelReason?: string) {
    const ops: Prisma.PrismaPromise<unknown>[] = [
        prisma.order.update({
            where: { id: orderId },
            data: {
                order_status: status,
                ...(shipDate ? { ship_date: shipDate } : {}),
                ...(status === "cancelled" ? { cancel_reason: cancelReason ?? null } : {}),
            },
        }),
    ];
    // Order<->Product is 1:N via the scalar Product.order_id, so one updateMany
    // returns every piece to the archive.
    if (status === "cancelled") {
        ops.push(prisma.product.updateMany({ where: { order_id: orderId }, data: { order_id: null } }));
    }
    await prisma.$transaction(ops);
}

// ─────────────────────────────────────────────────────────────────────────
// Customer checkout. Takes NO client input: the bag in the database is the
// source of truth and identity comes from the session.
export async function OrderCreateAction(): Promise<ActionResult<{ orderId: string }>> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;

    try {
        // 1. Pre-flight — outside the transaction so the bag clean-up below
        //    survives an early return.
        const account = await prisma.account.findUnique({
            where: { id: auth.user.id },
            select: {
                id: true, name: true, contact: true, city: true, barangay: true, address: true,
                cart: {
                    select: {
                        id: true,
                        product: {
                            select: { id: true, name: true, price: true, image: true, size: true, order: { select: { id: true } } },
                        },
                    },
                },
                like: { select: { id: true } },
            },
        });
        if (!account?.cart) return fail("Your bag could not be found", "NOT_FOUND");
        if (!account.contact || !account.barangay || !account.address)
            return fail("Please complete your delivery details (contact, barangay and address) in your profile", "VALIDATION");

        const items = account.cart.product;
        if (items.length === 0) return fail("Your bag is empty", "CONFLICT");

        // Sold-ness is the relation, not the scalar: many products have order_id
        // unset rather than null (see CLAUDE.md).
        const gone = items.filter((item) => item.order !== null);
        if (gone.length > 0) {
            await prisma.cart.update({
                where: { id: account.cart.id },
                data: { product: { disconnect: gone.map((item) => ({ id: item.id })) } },
            });
            const names = gone.map((item) => item.name).join(", ");
            const verb = gone.length === 1 ? "It was" : "They were";
            return fail("No longer available: " + names + ". " + verb + " removed from your bag — please review it and try again.", "CONFLICT");
        }

        const cartId = account.cart.id;
        const likeId = account.like?.id ?? null;
        const ids = items.map((item) => item.id);
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);
        const snapshot = {
            name: account.name,
            city: account.city,
            barangay: account.barangay,
            address: account.address,
            contact: account.contact,
            shipping_fee: SHIPPING_FEE,
            items: snapshotItems(items),
        };

        // 2. Claim the pieces and create the order atomically.
        const placeOrder = () => prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: { ...snapshot, total_price: subtotal + SHIPPING_FEE, account: { connect: { id: account.id } } },
                select: { id: true },
            });

            // The scalar filter is what makes the claim atomic. Both a null and
            // an unset order_id count as "unclaimed".
            const claimed = await tx.product.updateMany({
                where: { id: { in: ids }, OR: [{ order_id: null }, { order_id: { isSet: false } }] },
                data: { order_id: order.id },
            });
            if (claimed.count !== ids.length) throw new CheckoutRace();

            const links = ids.map((id) => ({ id }));
            await tx.cart.update({ where: { id: cartId }, data: { product: { disconnect: links } } });
            if (likeId) await tx.like.update({ where: { id: likeId }, data: { product: { disconnect: links } } });

            return order.id;
        });

        let orderId: string;
        try {
            orderId = await placeOrder();
        } catch (error) {
            // One retry on a transient MongoDB write conflict.
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") orderId = await placeOrder();
            else throw error;
        }

        return ok("Order placed", { orderId });
    } catch (error) {
        if (error instanceof CheckoutRace)
            return fail("One of your pieces was just sold to someone else. Please review your bag and try again.", "CONFLICT");
        console.error("OrderCreateAction failed", error);
        return fail("Your order could not be placed");
    } finally {
        revalidatePath('/account/cart');
        revalidatePath('/account/checkout');
        revalidateOrderViews();
        // Purchased pieces leave the storefront listings — refresh the static pages
        revalidateStorefront();
    }
}

// Customer: cancel own order while it is still pending. Releases the pieces.
export async function OrderCancelAction(order_id: string): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(order_id).success) return fail("Invalid order", "VALIDATION");

    let released = false;
    try {
        const order = await prisma.order.findFirst({
            where: { id: order_id, account_id: auth.user.id },
            select: { id: true, order_status: true },
        });
        if (!order) return fail("Order not found", "NOT_FOUND");
        if (!canTransition(order.order_status, "cancelled", "customer"))
            return fail("A " + order.order_status + " order can no longer be cancelled", "CONFLICT");

        await applyStatus(order.id, "cancelled", undefined, "Cancelled by customer");
        released = true;
        return ok("Order cancelled — the pieces are back in the archive");
    } catch (error) {
        console.error("OrderCancelAction failed", error);
        return fail("The order could not be cancelled");
    } finally {
        revalidateOrderViews();
        if (released) revalidateStorefront();
    }
}

// Admin: change status / ship date / cancel reason, following the transition table.
export async function OrderUpdateAction(order_id: string, input: OrderAdminUpdateInput): Promise<ActionResult> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(order_id).success) return fail("Invalid order", "VALIDATION");
    const parsed = OrderAdminUpdateSchema.safeParse(input);
    if (!parsed.success) return fail(firstIssue(parsed.error), "VALIDATION");
    const { status, ship_date, cancel_reason } = parsed.data;

    let released = false;
    try {
        const order = await prisma.order.findUnique({
            where: { id: order_id },
            select: { id: true, order_status: true, order_date: true },
        });
        if (!order) return fail("Order not found", "NOT_FOUND");
        if (status !== order.order_status && !canTransition(order.order_status, status, "admin"))
            return fail("An order can't go from " + order.order_status + " to " + status, "CONFLICT");

        let shipDate: Date | undefined;
        if (ship_date) {
            shipDate = new Date(ship_date);
            const orderDay = new Date(order.order_date);
            orderDay.setUTCHours(0, 0, 0, 0);
            if (shipDate < orderDay) return fail("The ship date can't be before the order date", "VALIDATION");
        }

        await applyStatus(order.id, status, shipDate, cancel_reason || undefined);
        released = status === "cancelled" && order.order_status !== "cancelled";
        return ok("Order updated");
    } catch (error) {
        console.error("OrderUpdateAction failed", error);
        return fail("The order could not be updated");
    } finally {
        revalidateOrderViews();
        if (released) revalidateStorefront();
    }
}

// Admin: hard-delete an order, releasing its pieces atomically.
export async function OrderDeleteAction(order_id: string): Promise<ActionResult> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(order_id).success) return fail("Invalid order", "VALIDATION");

    try {
        const order = await prisma.order.findUnique({ where: { id: order_id }, select: { id: true } });
        if (!order) return fail("Order not found", "NOT_FOUND");

        await prisma.$transaction([
            prisma.product.updateMany({ where: { order_id: order.id }, data: { order_id: null } }),
            prisma.order.delete({ where: { id: order.id } }),
        ]);
        return ok("Order deleted");
    } catch (error) {
        console.error("OrderDeleteAction failed", error);
        return fail("The order could not be deleted");
    } finally {
        revalidateOrderViews();
        // Released pieces return to the storefront listings
        revalidateStorefront();
    }
}
