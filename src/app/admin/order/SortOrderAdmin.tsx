"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import style from './SortOrderAdmin.module.scss'


export default function SortOrder({ status }: { status: string }) {
    const router = useRouter();

    const sortOrders = (status: string) => {
        if (status === '')
            router.push("/admin/order");
        else
            router.push("/admin/order?status=" + status);
    };

    return (
        <div className={style.container}>
            <button className={status === undefined ? style.active : ''} onClick={() => sortOrders('')}>All</button>
            <button className={status === 'pending' ? style.active : ''} onClick={() => sortOrders('pending')}>Pending</button>
            <button className={status === 'processing' ? style.active : ''} onClick={() => sortOrders('processing')}>Processing</button>
            <button className={status === 'shipped' ? style.active : ''} onClick={() => sortOrders('shipped')}>Shipped</button>
            <button className={status === 'cancelled' ? style.active : ''} onClick={() => sortOrders('cancelled')}>Cancelled</button>
            <button className={status === 'received' ? style.active : ''} onClick={() => sortOrders('received')}>Completed</button>
        </div>
    )
}

