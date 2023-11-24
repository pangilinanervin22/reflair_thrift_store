'use server'

import prisma from "@/db/prisma"
import { revalidatePath } from 'next/cache'
import type { Account } from "@prisma/client";
import bcrypt from "bcryptjs";


export async function CreateAccountAction(req: any) {
    const { username, name, password } = req;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.account.create({ data: { name, username, password: hashedPassword } });
        console.log(data);

        return data
    } catch (error) {
        console.log(error);
        return "Unsuccessful register"
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

export async function LoginAccount(req: any) {
    const { username, password } = req;

    console.log(username, password);
    const data = await prisma.account.findUnique({ where: { username: username } });
    if (!data) return "Client not found.";

    console.log("find " + data.password, data);

    const passwordMatch = await bcrypt.compare(
        password,
        data.password
    );
    console.log(passwordMatch);
    if (!passwordMatch) return "Wrong password.";

    // Do something with the username, e.g. save it to a database
    return "User logged in." + username;
}

