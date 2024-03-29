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
        if (res?.ok)
            toast.success(res.message, { toastId: item_id + "likeRemoveSuccess" });
        else
            toast.error(res.message, { toastId: item_id + "likeRemoveError" });
    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>REMOVE TO CART</button>}
        </div>
    )
}

