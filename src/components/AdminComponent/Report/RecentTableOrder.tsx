import prisma from "@/db/prisma"
import formatDate from "@/utils/formatDate"
import style from './Report.module.scss'
import StatusSpan from "@/components/status/StatusSpan"
import { formatPeso } from "@/utils/formatPrice";

export default async function RecentTableOrder() {
    const recentOrders = await prisma.order.findMany({
        take: 10,
        orderBy: { order_date: 'desc' },
        // Only the columns shown; the piece count comes from _count, not a join
        select: {
            id: true,
            order_status: true,
            name: true,
            order_date: true,
            total_price: true,
            _count: { select: { product: true } },
        },
    });

    return (
        <table className={style.table_order}>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Total Price</th>
                    <th>Pieces</th>
                </tr>
            </thead>
            <tbody>
                {recentOrders.map((order) => (
                    <tr key={order.id}>
                        <td><StatusSpan status={order.order_status} /></td>
                        <td>{order.name}</td>
                        <td>{formatDate(order.order_date)}</td>
                        <td>{formatPeso(order.total_price)}</td>
                        <td>{order._count.product}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
