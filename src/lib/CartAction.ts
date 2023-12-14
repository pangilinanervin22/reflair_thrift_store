'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";


export async function CartProductAddAction(email: string, product_id: string) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: email
            },
            include: {
                cart: true
            }
        });

        if (!account)
            return { message: "Account not found", error: true }


        const product = await prisma.product.findUnique({
            where: {
                id: product_id,
            }
        });

        if (!product)
            return { message: "Product not found", error: true }
        else if (product.status === "unavailable")
            return { message: "Product not available", error: true }

        const productExistsInCart = account.cart?.product_id.includes(product_id);
        if (productExistsInCart)
            return { message: "Product already in cart", error: true }

        const cartUpdate = await prisma.cart.update({
            where: {
                account_id: account?.id
            },
            data: {
                product_id: {
                    push: product_id
                }
            }
        });

        if (!cartUpdate)
            return { message: "Cart error occurred", error: true }

        return { message: "Product added in cart", ok: true }
    } catch (error) {
        return { message: "Cart error occurred", error: error }
    } finally {
        revalidatePath('/product');
    }
}

export async function CartProductRemoveAction(email: string, product_id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: product_id,
            }
        });

        if (!product)
            return { message: "Product not found", error: true }
        else if (product.status === "unavailable")
            return { message: "Product not available", error: true }

        const account = await prisma.account.findUnique({
            where: {
                email: email
            },
            include: {
                cart: true
            }
        });

        if (!account)
            return { message: "Account not found", error: true }

        const cartUpdate = await prisma.cart.update({
            where: { id: account?.cart?.id },
            data: {
                product_id: {
                    set: account?.cart?.product_id.filter((item) => item !== product_id)
                }
            }
        })

        if (!cartUpdate)
            return { message: "Cart error occurred", error: true }

        return { message: "Product added in cart", ok: true }
    } catch (error) {
        return { message: "Cart error occurred", error: error }
    } finally {
        revalidatePath('/cart');
    }
}