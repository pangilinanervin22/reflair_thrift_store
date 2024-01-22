"use client"

import { LikeAddAction, LikeRemoveAction } from '@/lib/LikeAction'
import wait from '@/utils/wait';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    email: string;
    item_id: string;
    classStyle?: string;
    children?: React.ReactNode;
}

export default function AddLikeButton({ email, item_id, classStyle, children }: Props) {
    const router = useRouter();

    async function handleClick() {
        if (!email) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        const res = await LikeAddAction(email, item_id);
        if (res?.ok)
            toast.success(res.message, { toastId: item_id + "likeAddSuccess" });
        else
            toast.error(res.message, { toastId: item_id + "likeAddError" });
    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>REMOVE TO CART</button>}
        </div>
    )
}

