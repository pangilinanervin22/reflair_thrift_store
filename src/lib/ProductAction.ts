'use server'

import prisma from "@/db/prisma"
import { uploadthingApi } from "@/db/uploadthingApi";
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";


// FIXME:  validation and respond body
export async function CreateProductAction(data: PostProduct) {
    const res = await prisma.product.create({
        data:
        {
            ...data,
            tags: ["tag1", "tag2"],
            status: "available"
            // status: "available"
        }
    });
    console.log(res, "action");
    revalidatePath('/admin/product');

    if (res)
        redirect('/admin/product')
}

export async function UpdateProductAction(id: string, data: any) {
    const res = await prisma.product.update({ where: { id: id }, data: data });
    console.log(res, "action");
    revalidatePath('/admin/product');

    if (res)
        redirect('/admin/product')
}


export async function DeleteProductAction(id: string) {
    const res = await prisma.product.findUnique({ where: { id: id } });
    console.log(res, "action");

    if (!res) {
        console.log("not found");
        return
    }

    console.log(res?.image, "action");
    if (res?.image !== "https://utfs.io/f/dca9a6a3-7204-407a-b16d-6b224dd8b188-4pl4mu.png")
        await uploadthingApi.deleteFiles([res?.image.replace("https://utfs.io/f/", "")])

    await prisma.product.delete({ where: { id: id } })
    revalidatePath('/admin/product');
}