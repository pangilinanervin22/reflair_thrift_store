'use client'

import { OrderCreateAction } from '@/lib/OrderAction';
import { Account } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    account: Account;
    product: string[] | undefined;
    children?: React.ReactNode;
}

export default function CheckOutButton({ account, product, children }: Props) {
    const router = useRouter();
    const checkout = async () => {
        const loading = toast.loading("Order is being processed");

        const order = await OrderCreateAction(account, product || []);

        if (order.ok) {
            toast.update(loading, { render: order.message, type: "success", isLoading: false, autoClose: 2000 });
            router.push("/account/order");
        } else if (order.error) {
            toast.update(loading, { render: order.message, type: "error", isLoading: false, autoClose: 2000 });
            return;
        }
    }
    return (
        <>
            <div onClick={() => checkout()}>
                {children}
            </div>
        </>
    )
}
