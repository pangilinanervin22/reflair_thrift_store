'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";


export async function LikeAddAction(email: string, product_id: string) {
    try {
        //  validate product and account
        const [account, product] = await Promise.all([
            prisma.account.findUnique({
                where: {
                    email: email
                },
                include: {
                    like: true
                }
            }),
            prisma.product.findUnique({
                where: {
                    id: product_id,
                    order: null,
                }
            })
        ]);

        if (!account) {
            return { message: "Account not found", error: true };
        }

        if (!product || product.status === "unavailable") {
            return { message: "Product is unavailable", error: true };
        }

        const productExistsInLike = account.like?.product_id.includes(product_id);
        if (productExistsInLike)
            return { message: "Product already in like", error: true }

        const likeUpdate = await prisma.like.update({
            where: {
                account_id: account?.id
            },
            data: {
                product: {
                    connect: {
                        id: product_id
                    }
                }
            }
        });

        if (!likeUpdate) {
            return { message: "Product error occurred", error: true }
        }

        return { message: "Product added in like", ok: true }
    } catch (error) {
        return { message: "Error in adding like", error: error }
    } finally {
        revalidatePath('/like');
    }
}

export async function LikeRemoveAction(email: string, product_id: string) {
    try {
        const [product, account] = await Promise.all([
            prisma.product.findUnique({
                where: {
                    id: product_id,
                }
            }),
            prisma.account.findUnique({
                where: {
                    email: email
                },
                include: {
                    like: true
                }
            })
        ]);

        if (!product || product.status === "unavailable") {
            return { message: "Product not available", error: true };
        }

        if (!account) {
            return { message: "Account not found", error: true };
        }

        const likeUpdate = await prisma.like.update({
            where: { id: account.like?.id },
            data: {
                product: {
                    disconnect: {
                        id: product_id,
                    }
                }
            }
        });

        if (!likeUpdate) {
            return { message: "Like error occurred", error: true }
        }

        return { message: "Product added in like", ok: true }
    } catch (error) {
        return { message: "Like error occurred", error: error }
    } finally {
        revalidatePath('/like');
    }
}