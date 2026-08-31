'use server'

import prisma from "@/db/prisma"
import { uploadthingApi } from "@/db/uploadthingApi";
import { revalidatePath } from 'next/cache'
import { revalidateStorefront } from './revalidateStorefront';
import { requireAdmin } from "./auth";
import { fail, ok, type ActionResult } from "./actionResult";
import { ObjectIdSchema, firstIssue } from "./schemas/common";
import { ProductInputSchema, type ProductInput } from "./schemas/product";
import { extractUploadThingKey } from "./uploadthingUrl";
import { PLACEHOLDER_PRODUCT_IMAGE } from "./constants";

// All three are admin-only; input is validated and fields are picked
// explicitly (no spreading client objects into Prisma).

function revalidateProducts() {
    revalidatePath('/admin/product');
    revalidateStorefront();
}

export async function ProductCreateAction(input: ProductInput): Promise<ActionResult<{ id: string }>> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    const parsed = ProductInputSchema.safeParse(input);
    if (!parsed.success) return fail(firstIssue(parsed.error), "VALIDATION");
    const { name, price, image, size, category, color, material } = parsed.data;

    try {
        const product = await prisma.product.create({
            data: { name, price, image, size, category, color, material },
            select: { id: true },
        });
        return ok("Product created", { id: product.id });
    } catch (error) {
        console.error("ProductCreateAction failed", error);
        return fail("The product could not be created");
    } finally {
        revalidateProducts();
    }
}

export async function ProductUpdateAction(id: string, input: ProductInput): Promise<ActionResult> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(id).success) return fail("Invalid product", "VALIDATION");
    const parsed = ProductInputSchema.safeParse(input);
    if (!parsed.success) return fail(firstIssue(parsed.error), "VALIDATION");
    const { name, price, image, size, category, color, material } = parsed.data;

    try {
        // Sold pieces are frozen: their price is part of an order's history.
        const existing = await prisma.product.findFirst({ where: { id, order: null }, select: { id: true } });
        if (!existing) return fail("Sold pieces can't be edited", "CONFLICT");

        await prisma.product.update({
            where: { id },
            data: { name, price, image, size, category, color, material },
        });
        return ok("Product updated");
    } catch (error) {
        console.error("ProductUpdateAction failed", error);
        return fail("The product could not be updated");
    } finally {
        revalidateProducts();
    }
}

export async function ProductDeleteAction(id: string): Promise<ActionResult> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(id).success) return fail("Invalid product", "VALIDATION");

    try {
        const product = await prisma.product.findFirst({
            where: { id, order: null },
            select: { id: true, image: true },
        });
        if (!product) return fail("Product not found, or it belongs to an order", "NOT_FOUND");

        // Clear both sides of the bag/saved links, then delete — atomically.
        await prisma.$transaction([
            prisma.product.update({ where: { id }, data: { Cart: { set: [] }, Like: { set: [] } } }),
            prisma.product.delete({ where: { id } }),
        ]);

        // Best effort: remove the file from UploadThing after the DB delete. An
        // orphaned file must never fail the action. The shared placeholder stays.
        const key = extractUploadThingKey(product.image);
        if (key && key !== extractUploadThingKey(PLACEHOLDER_PRODUCT_IMAGE)) {
            try {
                await uploadthingApi.deleteFiles([key]);
            } catch (error) {
                console.error("UploadThing deleteFiles failed for", key, error);
            }
        }

        return ok("Product deleted");
    } catch (error) {
        console.error("ProductDeleteAction failed", error);
        return fail("The product could not be deleted");
    } finally {
        revalidateProducts();
    }
}
