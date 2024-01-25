'use server'

import prisma from "@/db/prisma"
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

interface CredentialsBody {
    name: string;
    email: string;
    password: string;
    role?: string;
    contact?: string;
    city?: string;
    barangay?: string;
    address?: string;
}

interface UpdateCredentialsBody {
    email: string;
    name: string;
    contact?: string;
    city?: string;
    barangay?: string;
    address?: string;
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
                },
                like: {
                    create: {}
                },
            },
        });

        return { message: "Account created", ok: true }
    } catch (error) {
        return { message: "Registration Failed", error: error }
    } finally {
        revalidatePath('/account');
    }
}

export async function AccountDeleteAction(id: string) {
    try {
        const account = await prisma.account.findUnique({ where: { id }, include: { cart: true, like: true } });
        if (!account) {
            return { message: "Account not found", error: true };
        }

        // Delete the associated cart
        if (account.cart && account.like) {
            await prisma.cart.delete({ where: { id: account.cart.id } });
            await prisma.like.delete({ where: { id: account.like.id } });
        }

        // Delete the account
        await prisma.account.delete({ where: { id } });

        return { message: "Account and associated cart deleted", ok: true };
    } catch (error) {
        console.error("Error deleting account and cart:", error);
        return { message: "Deletion failed", error: error };
    } finally {
        revalidatePath('/account');
    }
}

export async function AccountUpdateFormAction(data: UpdateCredentialsBody) {
    const { email, name, contact, city, barangay, address } = data;
    try {
        await prisma.account.update({
            where: { email },
            data: {
                name,
                contact,
                city,
                barangay,
                address,
            }
        });

        return { message: "Account updated", ok: true };
    } catch (error) {
        return { message: "Update failed", error: error };
    } finally {
        revalidatePath('/account');
    }
}

export async function isEmailExist(email: string) {
    const data = await prisma.account.findUnique({ where: { email: email } });
    if (!data) return false;

    return true;
}