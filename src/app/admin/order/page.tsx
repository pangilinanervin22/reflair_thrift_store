
import OrderTable from "@/app/admin/order/OrderTable";
import prisma from "@/db/prisma"
import SortOrder from "./SortOrderAdmin";
import wait from "@/utils/wait";
import { OrderStatus } from "@prisma/client";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrderPage({ searchParams, }: PageProps) {
    const params = await searchParams;

    const allOrder = await prisma.order.findMany({
        include: {
            account: true
        }
    });

    const status = params.status as OrderStatus;
    let listOrder = [...allOrder];
    if (status)
        listOrder = allOrder.filter((order) => {
            if (params.status) {
                return order.order_status === params.status;
            }
            return true;
        });

    return (
        <OrderTable data={listOrder} status={status} />
    )
}


