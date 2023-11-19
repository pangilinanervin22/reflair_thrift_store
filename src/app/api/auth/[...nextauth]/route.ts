import prisma from "@/db/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Account, User as AuthUser } from "next-auth";


export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // async authorize(credentials: any) {
            //     const { username, password } = credentials;
            //     const data = await fetch("http://localhost:3000/api/client/login", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ username, password })
            //     }).then(res => res.json());
            //     console.log(data);
            //     if (data.message) throw new Error(data.message);
            //     return data;
            async authorize(credentials: any) {
                const { username, password } = credentials;
                try {
                    const user = await prisma.client.findUnique({ where: { username } });
                    console.log(user, "login");
                    if (!user)
                        return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch)
                        return null;

                    return user;
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider == "credentials") {
                console.log(user, account, "log");

                return true;
            }
        },
        async session({ session, user, token }: { session: any; user: any, token: any }) {
            // console.log("session", session);
            // console.log("user", user);
            // console.log("token", token);
            return session;
        },
        // async jwt({ token, account, profile }: any) {
        //     // Persist the OAuth access_token and or the user id to the token right after signin
        //     console.log("token", token);
        //     console.log("account", account);
        //     console.log("profile", profile);

        //     return token
        // }
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