"use client"

import { LikeRemoveAction } from '@/lib/LikeAction'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface RemoveCartButtonProps {
    email: string;
    item_id: string;
    classStyle?: string;
    children?: React.ReactNode;
}

export default function RemoveLikeButton({ email, item_id, classStyle, children }: RemoveCartButtonProps) {
    const router = useRouter();

    async function handleClick() {
        if (email === null) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        const res = await LikeRemoveAction(email, item_id);
        console.log(res, "action");
        if (res?.ok)
            toast.success(res.message);
        else
            toast.error(res.message);
    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>REMOVE TO CART</button>}
        </div>
    )
}

