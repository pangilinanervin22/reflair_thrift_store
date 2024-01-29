
'use server'

import prisma from "@/db/prisma"
import CustomerTable from "./CustomerTable"


export default async function CustomerPage() {
    const user = await prisma.account.findMany({
        where: {
            role: "customer"
        },
        include: {
            order: true
        },
        orderBy: {
            name: "asc"
        }
    })

    return (
        <CustomerTable data={user} />
    )
}
