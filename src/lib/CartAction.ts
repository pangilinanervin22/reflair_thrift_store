'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "./auth";
import { fail, ok, type ActionResult } from "./actionResult";
import { ObjectIdSchema } from "./schemas/common";

// Identity always comes from the session (requireUser) — never from the client.

function revalidateBag() {
    revalidatePath('/account/cart');
    revalidatePath('/account/checkout');
}

export async function CartAddAction(product_id: string): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(product_id).success) return fail("Invalid product", "VALIDATION");

    try {
        const [cart, product] = await Promise.all([
            prisma.cart.findUnique({ where: { account_id: auth.user.id }, select: { id: true, product_id: true } }),
            // Availability is the relation, not the scalar order_id (see CLAUDE.md)
            prisma.product.findFirst({ where: { id: product_id, order: null }, select: { id: true } }),
        ]);

        if (!cart) return fail("Your bag could not be found", "NOT_FOUND");
        if (!product) return fail("This piece is no longer available", "CONFLICT");
        if (cart.product_id.includes(product_id)) return fail("Already in your bag", "CONFLICT");

        await prisma.cart.update({
            where: { id: cart.id },
            data: { product: { connect: { id: product_id } } },
        });

        return ok("Added to your bag");
    } catch (error) {
        console.error("CartAddAction failed", error);
        return fail("Your bag could not be updated");
    } finally {
        revalidateBag();
    }
}

export async function CartRemoveAction(product_id: string): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(product_id).success) return fail("Invalid product", "VALIDATION");

    try {
        const cart = await prisma.cart.findUnique({ where: { account_id: auth.user.id }, select: { id: true, product_id: true } });
        if (!cart) return fail("Your bag could not be found", "NOT_FOUND");
        if (!cart.product_id.includes(product_id)) return fail("This piece is not in your bag", "NOT_FOUND");

        await prisma.cart.update({
            where: { id: cart.id },
            data: { product: { disconnect: { id: product_id } } },
        });

        return ok("Removed from your bag");
    } catch (error) {
        console.error("CartRemoveAction failed", error);
        return fail("Your bag could not be updated");
    } finally {
        revalidateBag();
    }
}
