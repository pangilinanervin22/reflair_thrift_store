import React from 'react'
import style from './page.module.scss'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/db/options';
import prisma from '@/db/prisma';
import { redirect } from 'next/navigation';
import formatDate from '@/utils/formatDate';
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

    return (
        <div className={style.main_container}>
            <SortOrderClient status={status} />
            <div className={style.order_container}>
                {listOrder.map((cur) => (
                    <div className={style.order_card} key={cur.id}>
                        <h4>Order id: {cur.id}</h4>
                        <Image src={cur.product[0].image} width={100} height={100} alt={cur.product[0].name} />
                        <p>Product name: {cur.product[0].name}</p>
                        <p>Order status: {cur.order_status}</p>
                        <p>Order date: {formatDate(cur.order_date)}</p>
                        <div>
                            {cur.product.length} items
                            <p> Total price: {cur.total_price}</p>

                        </div>
                        <p></p>
                    </div>
                ))}
            </div>
        </div>
    )
}
