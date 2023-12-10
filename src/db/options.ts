import prisma from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions, } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    const user = await prisma.account.findUnique({ where: { email } });
                    if (!user)
                        return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch)
                        return null;

                    return { name: user.name, email: user.email, id: user.id, role: user.role };
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider == "credentials") {
                return user;
            }
            return user;
        },
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user?.role)
                token.role = user?.role;

            return token
        },
        async session({ session, token }: any) {

            session.user.role = token.role;
            return { ...session, user: { ...session.user } };
        },
    }
}
