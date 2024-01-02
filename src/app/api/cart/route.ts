import prisma from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req: any, res: any) {
    return NextResponse.json({ message: " Sample Message" }, { status: 200 });
}

export async function POST(req: any, res: any) {
    const { email } = await req.json();

    if (!email) return NextResponse.json({ message: "Client not found." }, { status: 404 });

    const account = await prisma.account.findUnique({ where: { email: email } });
    if (!account) return NextResponse.json({ message: "Client not found." }, { status: 404 });

    const countProductCart = await prisma.cart.findFirst({
        where: {
            account_id: account.id,

        }, include: {
            product: true
        }
    });

    const length = countProductCart?.product.length
    return NextResponse.json({ message: "Sample Message", count: length }, { status: 200 });
}

