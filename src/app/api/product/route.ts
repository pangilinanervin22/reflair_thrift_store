import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

export interface ProductRequestBody {
    id?: string;
    name: string;
    price: number;
    image: string;
    size: string;
    category: string;
    color: string;
    material: string;
}

export async function POST(req: any) {
    const { name, category, color, image, material, price, size } = await req.json() as ProductRequestBody;
    if (!name) {
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }

    try {

        const data = await prisma.product.create({
            data: {
                name, category, color, image, material, price, size
            }
        });

        console.log(data);

        return NextResponse.json({ message: "Product registered." + data.name }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }
}

