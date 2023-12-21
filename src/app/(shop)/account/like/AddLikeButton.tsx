"use client"

import { LikeAddAction } from '@/lib/LikeAction';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface AddLikeButtonProps {
    product: any;
    title: string;
    className?: string;
    session: any;
    children?: React.ReactNode;
}

export default function AddLikeButton({ product, className, session, children }: AddLikeButtonProps) {
    const router = useRouter();

    async function handleClick() {
        if (session === null) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        const res = await LikeAddAction(session.user.email, product.id);
        console.log(res, "action");
        if (res?.ok)
            toast.success(res.message);
        else
            toast.error(res.message);
    }
    return (
        <div className={className || ""} onClick={() => handleClick()}>
            {children || <button>LIKE</button>}
        </div>
    )
}