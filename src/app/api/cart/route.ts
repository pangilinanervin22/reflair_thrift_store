import prisma from "@/db/prisma";
import { authOptions } from "@/db/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Cart count for the signed-in user (used by the nav badge).
// The email comes from the session, never from the client.
export async function GET() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return NextResponse.json({ count: 0 }, { status: 200 });

    try {
        const account = await prisma.account.findUnique({
            where: { email },
            select: { cart: { select: { product_id: true } } },
        });

        return NextResponse.json({ count: account?.cart?.product_id.length ?? 0 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ count: 0, message: "Server Error" }, { status: 500 });
    }
}
