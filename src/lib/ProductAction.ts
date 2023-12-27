'use server'

import prisma from "@/db/prisma"
import { uploadthingApi } from "@/db/uploadthingApi";
import { revalidatePath } from 'next/cache'

export async function ProductCreateAction(data: PostProduct) {
    try {
        const res = await prisma.product.create({
            data:
            {
                ...data,
                id: data.id,
                tags: [data.material, data.color, data.size],
                status: "available"
            }
        });

        if (res)
            return { message: "Product created", ok: true }


    } catch (error) {
        return { message: "Product creation failed", error: true }
    } finally {
        revalidatePath('/admin/product');
        revalidatePath('/product');
    }
}

export async function ProductUpdateAction(id: string, data: PostProduct) {
    try {
        const productValidate = await prisma.product.findUnique({
            where: {
                id: id,
                order: null,
            }
        });

        if (!productValidate)
            return { message: "Product is currently on order", error: true }

        const res = await prisma.product.update({
            where: {
                id: id,
                order: null,
            }, data: {
                name: data.name,
                price: data.price,
                image: data.image,
                size: data.size,
                color: data.color,
                category: data.category,
                material: data.material,
                tags: [data.material, data.color, data.size],
            }
        });

        if (res)
            return { message: "Product updated", ok: true }

    } catch (error) {
        return { message: "Product update failed", error: true }
    } finally {
        revalidatePath('/admin/product');
        revalidatePath('/product');
    }
}

export async function ProductDeleteAction(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id,
                order: null,
            },
            include: {
                Cart: true,
                Like: true
            }
        });

        if (!product)
            return { message: "Product not found", error: true }

        // Disconnect product from all carts
        if (product?.Cart) {
            await Promise.all(product.Cart.map((cart) => {
                return prisma.cart.update({
                    where: { id: cart.id },
                    data: {
                        product: {
                            disconnect: {
                                id: id
                            }
                        }
                    }
                })
            }))
        }

        if (product?.Like) {
            await Promise.all(product.Like.map((like) => {
                return prisma.like.update({
                    where: { id: like.id },
                    data: {
                        product: {
                            disconnect: {
                                id: id
                            }
                        }
                    }
                })
            }))
        }

        if (product?.image !== "https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png")
            await uploadthingApi.deleteFiles([product?.image.replace("https://utfs.io/f/", "")]);

        await prisma.product.delete({ where: { id: id } });
        return { message: "Product deleted", ok: true }

    } catch (error) {
        return { message: "Deleting Failed", error: true }
    } finally {
        revalidatePath('/admin/product');
        revalidatePath('/product');
    }
}