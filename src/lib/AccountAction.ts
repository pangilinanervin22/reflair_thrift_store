'use server'

import prisma from "@/db/prisma"
import { revalidatePath } from 'next/cache'
import type { Account } from "@prisma/client";
import bcrypt from "bcryptjs";

interface CredentialsBody {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export async function CreateAccountAction(req: CredentialsBody) {
    const { email, name, password } = req;
    try {
        const validate = await prisma.account.findUnique({ where: { email: email } });
        if (validate) return { message: "Email already exist", error: true }

        const hashedPassword = await bcrypt.hash(password, 10);
        const account = await prisma.account.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cart: {
                    create: {}
                }
            },
        });

        return { message: "Account created", ok: true }
    } catch (error) {
        return { message: "Registration Failed", error: error }
    }
}

export async function deleteAccount(email: string) {
    try {
        const account = await prisma.account.findUnique({ where: { email }, include: { cart: true } });
        if (!account) {
            return { message: "Account not found", error: true };
        }

        // Delete the associated cart
        if (account.cart) {
            await prisma.cart.delete({ where: { id: account.cart.id } });
        }

        // Delete the account
        await prisma.account.delete({ where: { email } });

        return { message: "Account and associated cart deleted", ok: true };
    } catch (error) {
        console.error("Error deleting account and cart:", error);
        return { message: "Deletion failed", error: error };
    }
}

export async function DeleteAccountAction(id: string) {
    const res = await prisma.account.findUnique({ where: { id: id } });
    console.log(res, "action");

    const del = await prisma.account.deleteMany({ where: { id: id } })
    revalidatePath('/admin/employee');
}

export async function LoginAccount(req: CredentialsBody) {
    try {
        const { email, password } = req;
        const data = await prisma.account.findUnique({ where: { email: email } });
        if (!data) return { message: "Client not found", error: true }

        const passwordMatch = await bcrypt.compare(
            password,
            data.password
        );

        if (!passwordMatch) return { message: "Wrong password", error: true }

        return { message: "User logged in" + email, ok: true }
    } catch (error) {
        return { message: "Login Failed", error: error }
    }
}

export async function isEmailExist(email: string) {
    const data = await prisma.account.findUnique({ where: { email: email } });
    if (!data) return false;

    return true;
}