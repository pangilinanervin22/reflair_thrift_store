import prisma from '@/db/prisma';
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: any) {
    const { email, name, password } = await req.json() as RequestBody;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.account.create({ data: { name, email, password: hashedPassword } });
        console.log(data);

        return NextResponse.json({ message: "User registered." + email }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }
}

