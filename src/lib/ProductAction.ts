'use server'

import prisma from "@/db/prisma"
import { uploadthingApi } from "@/db/uploadthingApi";
import { revalidatePath } from 'next/cache'

export async function CreateProductAction(data: PostProduct) {
    try {
        const res = await prisma.product.create({
            data:
            {
                ...data,
                tags: [data.material, data.color, data.size],
                status: "available"
            }
        });

        if (res)
            return { message: "Product created", ok: true }


    } catch (error) {
        return { message: "Product creation failed", error: error }
    } finally {
        revalidatePath('/admin/product');
    }
}

export async function UpdateProductAction(id: string, data: PostProduct) {
    try {
        const res = await prisma.product.update({
            where: { id: id }, data: {
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
        return { message: "Product update failed", error: error }
    } finally {
        revalidatePath('/admin/product');
    }
}

export async function DeleteProductAction(id: string) {
    try {
        const res = await prisma.product.findUnique({ where: { id: id } });

        if (!res)
            return { message: "Product not found", error: true }

        if (res?.image !== "https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png")
            await uploadthingApi.deleteFiles([res?.image.replace("https://utfs.io/f/", "")])

        await prisma.product.delete({ where: { id: id } })
        return { message: "Product deleted", ok: true }

    } catch (error) {
        return { message: "Deleting Failed", error: error }
    } finally {
        revalidatePath('/admin/product');
    }
}