"use client"

import { LikeAddAction } from '@/lib/LikeAction'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    email?: string;
    item_id: string;
    classStyle?: string;
    children?: React.ReactNode;
}

export default function AddLikeButton({ email, item_id, classStyle, children }: Props) {
    const router = useRouter();
    const { data: session } = useSession();

    // Pages rendered statically don't know the user — fall back to the client session
    const userEmail = email || session?.user?.email || "";

    async function handleClick() {
        if (!userEmail) {
            toast.error("Please login to save pieces");
            router.push("/login");
            return;
        }

        const res = await LikeAddAction(userEmail, item_id);
        if (res?.ok)
            toast.success(res.message, { toastId: item_id + "likeAddSuccess" });
        else
            toast.error(res.message, { toastId: item_id + "likeAddError" });
    }

    return (
        <div className={classStyle || ""} onClick={() => handleClick()}>
            {children || <button>SAVE</button>}
        </div>
    )
}
