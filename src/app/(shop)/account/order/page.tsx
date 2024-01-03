import React from 'react'
import style from './page.module.scss'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/db/options';
import prisma from '@/db/prisma';
import { redirect } from 'next/navigation';
import formatDate, { formatDateString } from '@/utils/formatDate';
import { OrderStatus } from '@prisma/client';
import SortOrderClient from './SortOrderClient';
import Image from 'next/image';

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function OrderPage({ searchParams, }: PageProps) {
    const session = await getServerSession(authOptions);
    if (!session?.user)
        redirect("/login");

    const UserOrder = await prisma.order.findMany({
        where: {
            account_id: session?.user?.id
        },
        include: {
            product: true
        },
        orderBy: {
            order_date: "desc"
        }
    });

    const status = searchParams.status as OrderStatus;
    let listOrder = structuredClone(UserOrder);
    if (status)
        listOrder = listOrder.filter((order) => {
            if (status) {
                return order.order_status === status;
            }

            return true;
        });

    console.log(status);
    return (
        <div className={style.main_container}>
            <SortOrderClient status={status} />
            <div className={style.order_container}>
                {listOrder.map((cur) => (
                    <div className={style.order} key={cur.id}>
                        <div>
                            <h4>{"Order In: " + formatDateString(cur.order_date)}</h4>
                            <p className={getStatusStyle(cur.order_status)}>{cur.order_status}</p>
                        </div>
                        <div>
                            {cur.product.map((product) => (
                                <div className={style.product} key={product.id}>
                                    <Image src={product.image} alt={product.name} width={100} height={100} />
                                    <div>
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                    </div>
                                </div>))}
                        </div>
                        <div>
                            <p> Total price: {cur.total_price}</p>
                        </div>
                    </div>
                ))}
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