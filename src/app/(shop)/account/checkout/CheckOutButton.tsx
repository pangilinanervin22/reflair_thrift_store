'use client'

import { OrderCreateAction } from '@/lib/OrderAction';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    email: string;
    product: string[] | undefined;
    children?: React.ReactNode;
}

export default function CheckOutButton({ email, product, children }: Props) {

    console.log(product?.length, "product", product);

    const checkout = async () => {
        const loading = toast.loading("Order is being processed");
        const order = await OrderCreateAction(email, product || []);

        if (order.ok) {
            toast.update(loading, { render: order.message, type: "success", isLoading: false, autoClose: 2000 });
            return;
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
