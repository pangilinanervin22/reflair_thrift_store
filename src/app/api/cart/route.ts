import prisma from "@/db/prisma";
import { NextResponse } from "next/server";


export async function GET(req: any) {
    try {
        const data = await prisma.order.findMany({ include: { product: true } });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }
}

export async function POST(req: any) {
    try {
        const myAccount = await prisma.account.findUnique({ where: { email: "ervin22" } })
        if (!myAccount) return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
        const randomProduct = await prisma.product.findMany({ take: 2 })
        const productId = randomProduct.map(p => p.id)

        // const data = await prisma.order.create({
        //     data: {
        //         product_id: productId,
        //     }
        // });

        // console.log(data);
        // return NextResponse.json({
        //     message: "Product registered.",
        //     username: myAccount.username,
        //     account: myAccount.id,
        //     product: productId,
        //     data: data
        // }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }
}