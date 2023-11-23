'use server'

import prisma from "@/db/prisma"
import { revalidatePath } from 'next/cache'

export async function CreateProductAction(data: any) {
    const res = await prisma.product.create({ data: data });
    console.log(res, "action");
    revalidatePath('/admin/product');

    return res
}

export async function UpdateProductAction(id: string, data: any) {
    const res = await prisma.product.update({ where: { id: id }, data: data });
    console.log(res, "action");
    revalidatePath('/admin/product');

    return res
}


export async function DeleteProductAction(id: string) {
    const res = await prisma.product.findUnique({ where: { id: id } });
    console.log(res, "action");

    const del = await prisma.product.deleteMany({ where: { id: id } })
    console.log("action delete");
    revalidatePath('/admin/product');

    // ...
}