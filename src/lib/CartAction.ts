'use server'

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";


export async function CartProductAddManyAction(userId: string, productId: string[]) {
    try {
        const listProduct = await prisma.product.findMany({
            where: {
                id: {
                    in: productId
                }
            }
        });

        if (!listProduct)
            return { message: "Product not found", error: true }

        const productListId = listProduct.map((item) => item.id);
        const cartUpdate = prisma.cart.update({
            where: { id: userId },
            data: {
                product_id: {
                    push: productListId
                }
            }
        })

    } catch (error) {
        return { message: "Adding product in cart", error: error }
    } finally {
        revalidatePath('/product');
    }
}

export async function CartProductAddAction(email: string, productId: string) {
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
                id: productId
            }
        });

        if (!product)
            return { message: "Product not found", error: true }

        const productExistsInCart = account.cart?.product_id.includes(productId);
        if (productExistsInCart) {
            return { message: "Product already in cart", error: true }
        }

        const cartUpdate = await prisma.cart.update({
            where: {
                account_id: account?.id
            },
            data: {
                product_id: {
                    push: productId
                }
            }
        });

        if (!cartUpdate)
            return { message: "Product not found", error: true }

        return { message: "Product added in cart", ok: true }
    } catch (error) {
        return { message: "Error in adding cart", error: error }
    } finally {
        revalidatePath('/product');
    }
}

export async function CartProductRemoveAction(email: string, productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product)
            return { message: "Product not found", error: true }

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
                    set: account?.cart?.product_id.filter((item) => item !== productId)
                }
            }
        })

        console.log(cartUpdate);

        if (!cartUpdate)
            return { message: "Remove in cart", error: true }

        return { message: "Product added in cart", ok: true }
    } catch (error) {
        return { message: "Adding product in cart", error: error }
    } finally {
        revalidatePath('/cart');
    }
}