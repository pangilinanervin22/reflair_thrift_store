import React from 'react'
import style from './page.module.scss'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/db/options';
import prisma from '@/db/prisma';
import { redirect } from 'next/navigation';
import { formatDateString } from '@/utils/formatDate';
import { OrderStatus } from '@prisma/client';
import SortOrderClient from './SortOrderClient';
import Image from 'next/image';
import CancelOrderButton from './CancelOrderButton';
import Link from 'next/link';

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function OrderPage({ searchParams, }: PageProps) {
    const session = await getServerSession(authOptions);
    if (!session?.user)
        redirect("/login");

    const user = await prisma.account.findUnique({
        where: {
            email: session?.user?.email
        },
        include: {
            order: {
                include: {
                    product: true
                },
                orderBy: {
                    order_date: "desc"
                }
            }
        }
    });

    const UserOrder = user?.order || [];
    const status = searchParams.status as OrderStatus;
    let listOrder = structuredClone(UserOrder);
    if (status)
        listOrder = listOrder.filter((order) => {
            if (status) {
                return order.order_status === status;
            }

            return true;
        });



    return (
        <div className={style.main_container}>
            <SortOrderClient status={status} />
            <div className={style.order_container}>
                {listOrder.length ? listOrder.map((order) => (
                    <div className={style.order} key={order.id}>
                        <div>
                            <h4>{"Order In: " + formatDateString(order.order_date)}</h4>
                            <p className={getStatusStyle(order.order_status)}>{order.order_status}</p>
                        </div>
                        <div>
                            {order.product.map((product) => (
                                <div className={style.product} key={product.id}>
                                    <Image src={product.image} alt={product.name} width={100} height={100} />
                                    <div>
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                    </div>
                                </div>))}
                        </div>
                        <div>
                            <p> Order Total: {order.total_price}</p>
                            {order.order_status === "received" && <p>Received Date: {formatDateString(order.ship_date || new Date())}</p>}
                            {order.order_status === "pending" &&
                                <CancelOrderButton order_id={order.id} change_status="cancelled" />}
                            {order.order_status === "shipped" &&
                                <p>Shipped Date: {formatDateString(order.ship_date || new Date())}</p>}
                            {order.order_status === "processing" &&
                                <p>Intial Date: {formatDateString(order.ship_date || new Date())}</p>}
                        </div>
                    </div>
                )) :
                    <div className={style.no_item}>
                        <Image src={"/assets/images/no_order.png"} alt='wew' width={"1920"} height={"1920"} />
                        <p>
                            There are no items in this cart.
                        </p>
                        <Link href={"/product"}>
                            <button className={style.back_button}>
                                CONTINUE SHOPPING
                            </button>
                        </Link>
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