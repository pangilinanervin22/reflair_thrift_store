'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "./auth";
import { fail, ok, type ActionResult } from "./actionResult";
import { ObjectIdSchema } from "./schemas/common";

// Identity always comes from the session (requireUser) — never from the client.

export async function LikeAddAction(product_id: string): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(product_id).success) return fail("Invalid product", "VALIDATION");

    try {
        const [like, product] = await Promise.all([
            prisma.like.findUnique({ where: { account_id: auth.user.id }, select: { id: true, product_id: true } }),
            // Availability is the relation, not the scalar order_id (see CLAUDE.md)
            prisma.product.findFirst({ where: { id: product_id, order: null }, select: { id: true } }),
        ]);

        if (!like) return fail("Your saved list could not be found", "NOT_FOUND");
        if (!product) return fail("This piece is no longer available", "CONFLICT");
        if (like.product_id.includes(product_id)) return fail("Already in your saved pieces", "CONFLICT");

        await prisma.like.update({
            where: { id: like.id },
            data: { product: { connect: { id: product_id } } },
        });

        return ok("Saved to your favourites");
    } catch (error) {
        console.error("LikeAddAction failed", error);
        return fail("Your saved pieces could not be updated");
    } finally {
        revalidatePath('/account/like');
    }
}

export async function LikeRemoveAction(product_id: string): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(product_id).success) return fail("Invalid product", "VALIDATION");

    try {
        const like = await prisma.like.findUnique({ where: { account_id: auth.user.id }, select: { id: true, product_id: true } });
        if (!like) return fail("Your saved list could not be found", "NOT_FOUND");
        if (!like.product_id.includes(product_id)) return fail("This piece is not in your saved pieces", "NOT_FOUND");

        await prisma.like.update({
            where: { id: like.id },
            data: { product: { disconnect: { id: product_id } } },
        });

        return ok("Removed from your saved pieces");
    } catch (error) {
        console.error("LikeRemoveAction failed", error);
        return fail("Your saved pieces could not be updated");
    } finally {
        revalidatePath('/account/like');
    }
}
