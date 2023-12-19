
import OrderTable from "@/app/admin/order/OrderTable";
import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"

export default async function OrderPage() {
    const allOrder = await prisma.order.findMany({
        include: {
            account: true
        }
    });

    return (
        <>
            <OrderTable data={allOrder} />
        </>
    )
}
