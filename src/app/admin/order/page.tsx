
import OrderTable, { type OrderRow } from "@/app/admin/order/OrderTable";
import prisma from "@/db/prisma"
import { ORDER_STATUSES } from "@/lib/orderStatus";
import type { OrderStatus } from "@prisma/client";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrderPage({ searchParams, }: PageProps) {
    const params = await searchParams;
    const raw = Array.isArray(params.status) ? params.status[0] : params.status;
    const status = (ORDER_STATUSES as readonly string[]).includes(raw ?? "") ? (raw as OrderStatus) : undefined;

    const orders: OrderRow[] = await prisma.order.findMany({
        where: status ? { order_status: status } : undefined,
        // Only what the table shows — never the customer's password hash
        include: { account: { select: { name: true, email: true } } },
        orderBy: { order_date: "desc" },
    });

    return (
        <OrderTable data={orders} status={status ?? ""} />
    )
}
