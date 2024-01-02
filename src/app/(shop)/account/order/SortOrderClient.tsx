"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


export default function SortOrderClient() {
    const router = useRouter();

    const sortOrders = (status: string) => {
        if (status === '')
            router.push("/account/order");
        else
            router.push("/account/order?status=" + status);
    };

    return (
        <div>
            <button onClick={() => sortOrders('')}>All</button>
            <button onClick={() => sortOrders('pending')}>Pending</button>
            <button onClick={() => sortOrders('processing')}>Processing</button>
            <button onClick={() => sortOrders('shipped')}>Shipped</button>
            <button onClick={() => sortOrders('cancelled')}>Cancelled</button>
            <button onClick={() => sortOrders('received')}>Completed</button>
        </div>
    )
}

