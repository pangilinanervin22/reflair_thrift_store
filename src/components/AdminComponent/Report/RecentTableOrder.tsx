'use server'

import prisma from "@/db/prisma"
import formatDate from "@/utils/formatDate"
import style from './Report.module.scss'
import StatusSpan from "@/components/status/StatusSpan"


export default async function RecentTableOrder() {
    const recentOrders = await prisma.order.findMany({
        take: 10,
        orderBy: {
            order_date: 'desc',
        },
        include: {
            product: true,
        }
    });

    return (
        <table className={style.table_order}>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Total Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {recentOrders.map((order) => (
                    <tr key={order.id}>
                        <td><StatusSpan status={order.order_status} /></td>
                        <td>{order.name}</td>
                        <td>{formatDate(order.order_date)}</td>
                        <td>{order.total_price}</td>
                        <td>{order.product.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
