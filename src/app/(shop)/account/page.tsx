import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import AccountForm from "./AccountForm";


export default async function AccountPage() {
    const data = await getServerSession(authOptions);
    if (!data) redirect("/login");

    const account = await prisma.account.findUnique({
        where: {
            email: data?.user.email
        },
        include: {
            order: true
        }
    });

    // fetch all barangay for select option
    const city = await fetch("https://psgc.gitlab.io/api/cities/042103000/barangays/", { cache: "force-cache" });
    const barangay = await city.json();
    return (
        <AccountForm barangay={barangay} user={account} />
    )
}
