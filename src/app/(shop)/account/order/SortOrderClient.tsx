"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from './page.module.scss'

interface SortOrderClientProps {
    status: string
}

export default function SortOrderClient({ status }: SortOrderClientProps) {
    const router = useRouter();


    const sortOrders = (status: string) => {
        if (status === '')
            router.push("/account/order");
        else
            router.push("/account/order?status=" + status);
    };
    console.log(isActive("", status), status);

    return (
        <div className={style.status_container}>
            <button className={`${style.status} ${isActive('', status)}`} onClick={() => sortOrders('')}>All</button>
            <button className={`${style.status} ${isActive('pending', status)}`} onClick={() => sortOrders('pending')}>Pending</button>
            <button className={`${style.status} ${isActive('shipped', status)}`} onClick={() => sortOrders('shipped')}>Shipped</button>
            <button className={`${style.status} ${isActive('cancelled', status)}`} onClick={() => sortOrders('cancelled')}>Cancelled</button>
            <button className={`${style.status} ${isActive('received', status)}`} onClick={() => sortOrders('received')}>Completed</button>
        </div>
    )
}

function isActive(status: string, activeStatus: string | undefined) {

    if (status === '' && activeStatus === undefined)
        return style.active;
    if (status === activeStatus)
        return style.active;

    return '';
}