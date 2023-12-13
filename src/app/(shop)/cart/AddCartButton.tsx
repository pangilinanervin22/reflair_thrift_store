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
}

export default function AddCartButton({ product, className, title, session }: AddCartButtonProps) {
    const router = useRouter();
    async function handleClick() {
        console.log("add to cart", product.id);

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
        <button className={className || ""} onClick={() => handleClick()}>
            {"ADD TO CART"}
        </button>
    )
}