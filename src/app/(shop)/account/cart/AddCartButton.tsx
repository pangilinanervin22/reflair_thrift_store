"use client"

import { CartAddAction } from '@/lib/CartAction';
import { revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    email: string;
    item_id: string;
    classStyle?: string;
    children?: React.ReactNode;
}

export default function AddCartButton({ item_id, classStyle, email, children }: Props) {
    const router = useRouter();
    async function handleClick() {
        if (email === null) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        const res = await CartAddAction(email, item_id);
        console.log(res, "action");
        if (res?.ok)
            toast.success(res.message);
        else
            toast.error(res.message);

    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>ADD TO CART</button>}
        </div>
    )
}