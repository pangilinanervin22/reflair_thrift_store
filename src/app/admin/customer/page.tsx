
'use server'

import prisma from "@/db/prisma"
import CustomerTable from "./AccountTable"


export default async function CustomerPage() {
    const user = await prisma.account.findMany({
        where: {
            role: "customer"
        }
    })


    return (
        <div>
            <CustomerTable data={user} />
        </div>
    )
}
