import prisma from '@/db/prisma';
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(req: any) {
    const { username, password } = await req.json() as RequestBody;

    console.log(username, password);
    const data = await prisma.account.findUnique({ where: { username: username } });
    if (!data) return NextResponse.json({ message: "Client not found." }, { status: 404 });

    console.log("find " + data.password, data);

    const passwordMatch = await bcrypt.compare(
        password,
        data.password
    );
    console.log(passwordMatch);
    if (!passwordMatch) return NextResponse.json({ message: "Wrong password." }, { status: 400 });

    // Do something with the username, e.g. save it to a database
    return NextResponse.json({ message: "User logged in." + username }, { status: 200 });
}


