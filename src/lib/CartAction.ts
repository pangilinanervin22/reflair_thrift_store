'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";


export async function CartAddAction(email: string, product_id: string) {
    try {
        // validating product and account
        const [account, product] = await Promise.all([
            prisma.account.findUnique({
                where: {
                    email: email
                },
                include: {
                    cart: true
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

        const productExistsInCart = account.cart?.product_id.includes(product_id);
        if (productExistsInCart) {
            return { message: "Product already in cart", error: true };
        }

        const cartUpdate = await prisma.cart.update({
            where: {
                account_id: account.id
            },
            data: {
                product: {
                    connect: {
                        id: product_id
                    }
                }
            }
        });

        if (!cartUpdate) {
            return { message: "Cart error occurred", error: true };
        }

        return { message: "Product added to cart", ok: true };
    } catch (error) {
        return { message: "Cart error occurred", error: error };
    } finally {
        revalidatePath('/cart');
    }
}

export async function CartRemoveAction(email: string, product_id: string) {
    try {
        // validating product and account
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
                    cart: true
                }
            })
        ]);

        if (!product || product.status === "unavailable") {
            return { message: "Product not available", error: true };
        }

        if (!account) {
            return { message: "Account not found", error: true };
        }

        const cartUpdate = await prisma.cart.update({
            where: { id: account.cart?.id },
            data: {
                product: {
                    disconnect: {
                        id: product_id,
                    }
                }
            }
        });

        if (!cartUpdate) {
            return { message: "Cart error occurred", error: true };
        }

        return { message: "Product removed from cart", ok: true };
    } catch (error) {
        return { message: "Cart error occurred", error: error };
    } finally {
        revalidatePath('/cart');
    }
}