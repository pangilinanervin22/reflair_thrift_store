import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import { fail, type ActionErr } from "./actionResult";

export type SessionUser = {
    id: string;
    email: string;
    name: string;
    role: "admin" | "customer";
};

// Who is calling? Resolved from the session cookie, then re-read from the
// database so the role is authoritative — a demoted or deleted account loses
// access immediately, and the role inside the JWT is only a UI hint.
// React.cache dedupes repeated calls within one request.
//
// Same pattern as src/app/api/cart/route.ts: identity never comes from the client.
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return null;

    const account = await prisma.account.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, role: true },
    });
    if (!account) return null;

    return {
        id: account.id,
        email: account.email,
        name: account.name,
        role: account.role === "admin" ? "admin" : "customer",
    };
});

export type AuthResult =
    | { ok: true; user: SessionUser }
    | { ok: false; failure: ActionErr };

/** For customer actions. Usage: `const auth = await requireUser(); if (!auth.ok) return auth.failure;` */
export async function requireUser(): Promise<AuthResult> {
    const user = await getSessionUser();
    if (!user) return { ok: false, failure: fail("Please sign in to continue", "UNAUTHENTICATED") };
    return { ok: true, user };
}

/** For admin-only actions (product CRUD, order management, customer deletion, uploads). */
export async function requireAdmin(): Promise<AuthResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth;
    if (auth.user.role !== "admin") {
        return { ok: false, failure: fail("You are not allowed to do that", "FORBIDDEN") };
    }
    return auth;
}
