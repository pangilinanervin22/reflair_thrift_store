import prisma from "@/db/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Account, NextAuthOptions, } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const { username, password } = credentials;
                try {
                    const user = await prisma.account.findUnique({ where: { username } });
                    console.log(user, "login");
                    if (!user)
                        return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch)
                        return null;

                    return { name: user.name, email: user.username, id: user.id, role: user.role };
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider == "credentials") {
                console.log("credentials", user, account);

                return user;
            }
            return user;
        },
        // async jwt({ token, account, profile }: any) {
        //     Persist the OAuth access_token and or the user id to the token right after signin
        //     console.log("Main JWT Incididunt duis ipsum consectetur dolor quis excepteur incididunt duis incididunt dolore reprehenderit officia.");
        //     console.log("account", account);
        //     console.log("profile", profile);
        //     console.log("token", token);


        //     return token
        // },
        async session({ session, account, token }: any) {

            const user = await prisma.account.findUnique({ where: { id: token.sub } });
            console.log("Main Session Incididunt duis ipsum consectetur dolor quis excepteur incididunt duis incididunt dolore reprehenderit officia.");
            console.log("session", session);
            console.log("user", account);
            console.log("token", token);

            return { ...session, user: { ...session.user, role: user?.role } };
        },

    }
    // session: {
    //     strategy: "jwt",
    // },
    // secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     siginIn: "/login",
    // }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }