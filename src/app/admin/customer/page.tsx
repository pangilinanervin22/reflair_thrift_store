import prisma from "@/db/prisma"
import CustomerTable, { type CustomerRow } from "./CustomerTable"

export default async function CustomerPage() {
    const customers = await prisma.account.findMany({
        where: { role: "customer" },
        // Only what the table shows — never the password hash
        select: {
            id: true, name: true, email: true, city: true, barangay: true, contact: true,
            _count: { select: { order: true } },
        },
        orderBy: { name: "asc" },
    });

    const rows: CustomerRow[] = customers.map(({ _count, ...customer }) => ({
        ...customer,
        order_count: _count.order,
    }));

    return (
        <CustomerTable data={rows} />
    )
}
