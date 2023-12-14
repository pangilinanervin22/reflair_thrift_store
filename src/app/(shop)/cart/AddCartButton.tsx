"use client"

import { CartProductAddAction } from '@/lib/CartAction';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface AddCartButtonProps {
    product: any;
    title: string;
    className?: string;
    session: any;
    children?: React.ReactNode;

}

export default function AddCartButton({ product, className, session, children }: AddCartButtonProps) {
    const router = useRouter();
    async function handleClick() {
        if (session === null) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        const res = await CartProductAddAction(session.user.email, product.id);
        console.log(res, "action");
        if (res?.ok)
            toast.success(res.message);
        else
            toast.error(res.message);
    }

    return (
        <div className={className || ""} onClick={() => handleClick()}>
            {children || <button>ADD TO CART</button>}
        </div>
    )
}