'use client'

import { OrderCreateAction } from '@/lib/OrderAction';
import { notifyCartChanged } from '@/utils/cartEvents';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'react-toastify';

interface Props {
    /** True while delivery details are incomplete — the page explains what is missing. */
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

// The action takes no arguments: the bag in the database is the source of truth.
export default function CheckOutButton({ disabled, className, children }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const checkout = () => {
        if (isPending || disabled) return;
        const loading = toast.loading("Placing your order…");
        startTransition(async () => {
            try {
                const res = await OrderCreateAction();
                if (res.ok) {
                    toast.update(loading, { render: res.message, type: "success", isLoading: false, autoClose: 2000 });
                    notifyCartChanged();
                    router.push("/account/order?placed=" + (res.data?.orderId ?? ""));
                } else {
                    toast.update(loading, { render: res.message, type: "error", isLoading: false, autoClose: 5000 });
                    if (res.code === "UNAUTHENTICATED") router.push("/login?callbackUrl=%2Faccount%2Fcheckout");
                    else router.refresh(); // e.g. sold pieces were removed from the bag
                }
            } catch {
                toast.update(loading, { render: "Your order could not be placed. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
            }
        });
    };

    return (
        <button type="button" className={className} onClick={checkout} disabled={disabled || isPending} aria-busy={isPending}>
            {children ?? "Place order now"}
        </button>
    )
}
