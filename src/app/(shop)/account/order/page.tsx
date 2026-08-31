import style from './page.module.scss'
import prisma from '@/db/prisma';
import { redirect } from 'next/navigation';
import { formatDateString } from '@/utils/formatDate';
import type { OrderStatus } from '@prisma/client';
import SortOrderClient from './SortOrderClient';
import Image from 'next/image';
import CancelOrderButton from './CancelOrderButton';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';
import { ObjectIdSchema } from '@/lib/schemas/common';
import { ORDER_STATUSES } from '@/lib/orderStatus';
import { parseOrderItems } from '@/lib/orderItems';
import { formatPeso } from "@/utils/formatPrice";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export default async function OrderPage({ searchParams, }: PageProps) {
    const params = await searchParams;
    const user = await getSessionUser();
    if (!user) redirect("/login?callbackUrl=%2Faccount%2Forder");

    const orders = await prisma.order.findMany({
        where: { account_id: user.id },
        include: { product: true },
        orderBy: { order_date: "desc" },
    });

    const statusParam = first(params.status);
    const status = (ORDER_STATUSES as readonly string[]).includes(statusParam ?? "")
        ? (statusParam as OrderStatus)
        : undefined;
    const listOrder = status ? orders.filter((order) => order.order_status === status) : orders;

    // Post-checkout confirmation: /account/order?placed=<orderId>
    const placedParam = first(params.placed);
    const placed = placedParam && ObjectIdSchema.safeParse(placedParam).success
        ? orders.find((order) => order.id === placedParam)
        : undefined;
    // Count from the checkout snapshot as well: cancelling releases the relation.
    const placedCount = placed ? Math.max(placed.product.length, parseOrderItems(placed.items).length) : 0;

    return (
        <div className={style.main_container}>
            <header className={style.head}>
                <h1>Orders</h1>
            </header>
            {placed && (
                <div className={style.placed_banner} role="status">
                    <p className={style.placed_eyebrow}>Order placed</p>
                    <p>
                        Order #{placed.id.slice(-6).toUpperCase()} · {placedCount} {placedCount === 1 ? "piece" : "pieces"} · {formatPeso(placed.total_price)} · Cash on delivery.
                        We&apos;ll confirm by phone before dispatch.
                    </p>
                </div>
            )}
            <SortOrderClient status={status ?? ""} />
            <div className={style.order_container}>
                {listOrder.length ? listOrder.map((order) => (
                    <div className={style.order} key={order.id}>
                        <div>
                            <h4>{"Ordered " + formatDateString(order.order_date)}</h4>
                            <p className={getStatusStyle(order.order_status)}>{order.order_status}</p>
                        </div>
                        <div>
                            {order.product.length === 0 && (
                                <p className={style.released_note}>
                                    {order.order_status === "cancelled"
                                        ? "The pieces returned to the archive when this order was cancelled."
                                        : "No pieces on this order."}
                                </p>
                            )}
                            {/* Released pieces: show the snapshot taken at checkout instead */}
                            {order.product.length === 0 && parseOrderItems(order.items).map((item) => (
                                <div className={style.product} key={item.id}>
                                    <div>
                                        <p>{item.name}</p>
                                        <p className={style.product_price}>{formatPeso(item.price)}</p>
                                    </div>
                                </div>
                            ))}
                            {order.product.map((product) => (
                                <div className={style.product} key={product.id}>
                                    <Image src={product.image} alt={product.name} width={100} height={125} sizes="72px" />
                                    <div>
                                        <p>{product.name}</p>
                                        <p className={style.product_price}>{formatPeso(product.price)}</p>
                                    </div>
                                </div>))}
                        </div>
                        <div>
                            <p className={style.order_total}>Order total — {formatPeso(order.total_price)}</p>
                            {order.order_status === "cancelled" && order.cancel_reason && <p>{order.cancel_reason}</p>}
                            {order.order_status === "pending" && <CancelOrderButton order_id={order.id} />}
                            {order.order_status === "processing" && <p>Being prepared</p>}
                            {order.order_status === "shipped" && order.ship_date && <p>Shipped {formatDateString(order.ship_date)}</p>}
                            {order.order_status === "received" && order.ship_date && <p>Received {formatDateString(order.ship_date)}</p>}
                        </div>
                    </div>
                )) :
                    <div className={style.no_item}>
                        <h2>No orders here.</h2>
                        <p>Pieces you order will appear in this ledger.</p>
                        <Link href="/product" className={style.back_button}>Continue shopping</Link>
                    </div>
                }
            </div>
        </div>
    )
}


function getStatusStyle(status: OrderStatus) {
    switch (status) {
        case "processing":
            return style.processing;
        case "received":
            return style.received;
        case "cancelled":
            return style.cancelled;
        case "shipped":
            return style.shipped;
        default:
            return style.pending;
    }
}
