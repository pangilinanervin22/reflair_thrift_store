"use client"

import { CartAddAction } from '@/lib/CartAction';
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
    const [isPending, setIsPending] = React.useState(false);

    async function handleClick() {
        if (isPending) {
            console.log("Already pending");
            return;
        }
        if (!email) {
            toast.error("Please login to add to cart");
            router.push("/login");
            return;
        }

        setIsPending(true);
        let res;
        try {
            res = await CartAddAction(email, item_id);
        } catch (error) {
            console.log(error);
        }


        if (res?.ok)
            toast.success(res.message, { toastId: item_id + "cartAddSuccess" });
        else if (res?.error)
            toast.error(res.message, { toastId: item_id + + "cartAddError" });
        setIsPending(false);
    }

    return (
        <div className={classStyle || ""} onClick={async () => await handleClick()}>
            {children || <button>ADD TO CART</button>}
        </div>
    )
}