import prisma from '@/db/prisma';
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

interface RequestBody {
    name: string;
    username: string;
    password: string;
}

export async function GET() {
    try {
        const data = await prisma.account.findMany();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unsuccessful register" }, { status: 400 });
    }
}

