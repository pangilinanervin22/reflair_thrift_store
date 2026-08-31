'use server'

import prisma from "@/db/prisma"
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireUser } from "./auth";
import { fail, ok, type ActionResult } from "./actionResult";
import { ObjectIdSchema, firstIssue } from "./schemas/common";
import { AccountUpdateSchema, RegisterSchema, type AccountUpdateInput, type RegisterInput } from "./schemas/account";

// Public: customer self-registration. A role is never accepted here — admins
// are created by setting role: "admin" directly in MongoDB.
export async function CreateAccountAction(input: RegisterInput): Promise<ActionResult> {
    const parsed = RegisterSchema.safeParse(input);
    if (!parsed.success) return fail(firstIssue(parsed.error), "VALIDATION");
    const { name, email, password } = parsed.data;

    try {
        const existing = await prisma.account.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
            select: { id: true },
        });
        if (existing) return fail("An account with this email already exists", "CONFLICT");

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.account.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cart: { create: {} },
                like: { create: {} },
            },
        });

        return ok("Account created — you can sign in now");
    } catch (error) {
        // Unique-index race: two registrations for the same email at once
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
            return fail("An account with this email already exists", "CONFLICT");
        console.error("CreateAccountAction failed", error);
        return fail("Registration failed");
    }
}

// Admin: delete a customer account with its bag and saved list. Orders are kept
// (their account link becomes null) so sales history survives.
export async function AccountDeleteAction(id: string): Promise<ActionResult> {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.failure;
    if (!ObjectIdSchema.safeParse(id).success) return fail("Invalid account", "VALIDATION");
    if (id === auth.user.id) return fail("You cannot delete your own account", "CONFLICT");

    try {
        const account = await prisma.account.findUnique({
            where: { id },
            select: { id: true, role: true, cart: { select: { id: true } }, like: { select: { id: true } } },
        });
        if (!account) return fail("Account not found", "NOT_FOUND");
        if (account.role === "admin") return fail("Admin accounts cannot be deleted here", "FORBIDDEN");

        // Clear both sides of the product links before deleting the rows.
        const ops: Prisma.PrismaPromise<unknown>[] = [];
        if (account.cart) {
            ops.push(prisma.cart.update({ where: { id: account.cart.id }, data: { product: { set: [] } } }));
            ops.push(prisma.cart.delete({ where: { id: account.cart.id } }));
        }
        if (account.like) {
            ops.push(prisma.like.update({ where: { id: account.like.id }, data: { product: { set: [] } } }));
            ops.push(prisma.like.delete({ where: { id: account.like.id } }));
        }
        ops.push(prisma.account.delete({ where: { id } }));
        await prisma.$transaction(ops);

        return ok("Account deleted");
    } catch (error) {
        console.error("AccountDeleteAction failed", error);
        return fail("The account could not be deleted");
    } finally {
        revalidatePath('/admin/customer');
    }
}

// Customer: update own delivery details. Identity is the session — the client
// cannot choose which account to edit.
export async function AccountUpdateFormAction(input: AccountUpdateInput): Promise<ActionResult> {
    const auth = await requireUser();
    if (!auth.ok) return auth.failure;
    const parsed = AccountUpdateSchema.safeParse(input);
    if (!parsed.success) return fail(firstIssue(parsed.error), "VALIDATION");

    try {
        await prisma.account.update({
            where: { id: auth.user.id },
            data: { ...parsed.data, city: "Bacoor" },
        });
        return ok("Profile updated");
    } catch (error) {
        console.error("AccountUpdateFormAction failed", error);
        return fail("Your profile could not be updated");
    } finally {
        revalidatePath('/account');
        revalidatePath('/account/checkout');
    }
}
