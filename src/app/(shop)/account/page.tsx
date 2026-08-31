import { redirect } from "next/navigation";
import prisma from "@/db/prisma";
import AccountForm from "./AccountForm";
import { getSessionUser } from "@/lib/auth";
import { BACOOR_BARANGAYS } from "@/lib/bacoorBarangays";

export default async function AccountPage() {
    const user = await getSessionUser();
    if (!user) redirect("/login?callbackUrl=%2Faccount");

    const account = await prisma.account.findUnique({
        where: { id: user.id },
        // Only what the form edits — never the password hash
        select: { email: true, name: true, contact: true, barangay: true, address: true },
    });
    if (!account) redirect("/login");

    // Static PSGC snapshot (src/lib/bacoorBarangays.ts) — no runtime dependency on a third-party API
    return (
        <AccountForm barangay={BACOOR_BARANGAYS} user={account} />
    )
}
