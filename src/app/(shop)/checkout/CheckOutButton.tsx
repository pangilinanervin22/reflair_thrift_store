'use client'

import { OrderCreateAction } from '@/lib/OrderAction';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    email: string;
    product: string[] | undefined;
}

export default function CheckOutButton({ email, product }: Props) {

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
            <button onClick={() => checkout()}>CHECKOUT</button>
            {/* <button onClick={() => GetAllOrdersAction(email)}>CHECKOUT</button> */}
        </>
    )
}
