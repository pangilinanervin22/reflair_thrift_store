"use client"

import { CartRemoveAction } from '@/lib/CartAction'
import { OrderUpdateStatusAction } from '@/lib/OrderAction';
import { OrderStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    order_id: string;
    change_status: OrderStatus;
    classStyle?: string;
    children?: React.ReactNode;
}

export default function CancelOrderButton({ order_id, change_status, classStyle, children }: Props) {
    const router = useRouter();
    async function handleClick() {
        if (order_id === null) {
            toast.error("Order not found");
            router.refresh();
            return;
        }

        const res = await OrderUpdateStatusAction(order_id, change_status);
        console.log(res, "action");
        if (res?.ok)
            toast.success(res.message);
        else
            toast.error(res.message);
    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>Cancel Order</button>}
        </div>
    )
}
