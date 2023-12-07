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
    const { email, name, password, role } = req;
    try {
        const validate = await prisma.account.findUnique({ where: { email: email } });
        if (validate) return { message: "Email already exist", error: true }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await prisma.account.create({ data: { name, email, password: hashedPassword, role: role || "customer", } });
        const cart = await prisma.cart.create({ data: { account_id: data.id, } });

        return { message: "Account created", ok: true }
    } catch (error) {
        return { message: "Registration Failed", error: error }
    }
}

export async function UpdateAccountAction(id: string, data: Account) {
    const res = await prisma.account.update({ where: { id: id }, data: data });
    console.log(res, "action");
    revalidatePath('/admin/account');
    return res
}


export async function DeleteAccountAction(id: string) {
    const res = await prisma.account.findUnique({ where: { id: id } });
    console.log(res, "action");

    const del = await prisma.account.deleteMany({ where: { id: id } })
    console.log("action delete");
    revalidatePath('/admin/employee');

    // ...
}

export async function LoginAccount(req: CredentialsBody) {
    const { email, password } = req;
    const data = await prisma.account.findUnique({ where: { email: email } });
    if (!data) return "Client not found.";

    console.log("find " + data.password, data);

    const passwordMatch = await bcrypt.compare(
        password,
        data.password
    );

    if (!passwordMatch) return "Wrong password.";

    return "User logged in." + email;
}

