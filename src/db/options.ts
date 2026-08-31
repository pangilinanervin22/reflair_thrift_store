import prisma from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { LoginSchema } from "@/lib/schemas/account";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
    // next-auth's own redirects land on our login page instead of its default UI
    pages: { signIn: "/login", error: "/login" },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = LoginSchema.safeParse(credentials);
                if (!parsed.success) return null;
                const { email, password } = parsed.data;

                try {
                    const user = await prisma.account.findUnique({ where: { email } });
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) return null;

                    return { id: user.id, name: user.name, email: user.email, role: user.role };
                } catch (error) {
                    // Never surface a database error through the sign-in flow
                    console.error("authorize failed", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // `user` is only present on sign-in. The role stored here is a UI
            // hint; server actions re-read it from the database (src/lib/auth.ts).
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id ?? token.sub ?? "";
                session.user.role = token.role ?? "customer";
            }
            return session;
        },
    },
};
