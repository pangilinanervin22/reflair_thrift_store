"use client"

import { CartAddAction } from '@/lib/CartAction';
import { notifyCartChanged } from '@/utils/cartEvents';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    item_id: string;
    className?: string;
    /** For icon-only usage — gives the control an accessible name */
    ariaLabel?: string;
    children?: React.ReactNode;
}

// A real <button>: keyboard-reachable and announced by screen readers. Identity
// is resolved on the server from the session; the client only decides whether
// to send the user to log in.
export default function AddCartButton({ item_id, className, ariaLabel, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { status } = useSession();
    const [isPending, setIsPending] = React.useState(false);

    const goToLogin = () => {
        toast.error("Please log in to add pieces to your bag", { toastId: "loginRequired" });
        router.push("/login?callbackUrl=" + encodeURIComponent(pathname));
    };

    async function handleClick() {
        if (isPending) return;
        if (status === "unauthenticated") return goToLogin();

        setIsPending(true);
        try {
            const res = await CartAddAction(item_id);
            if (res.ok) {
                toast.success(res.message, { toastId: item_id + "cartAddSuccess" });
                notifyCartChanged();
            } else if (res.code === "UNAUTHENTICATED") {
                goToLogin();
            } else {
                toast.error(res.message, { toastId: item_id + "cartAddError" });
            }
        } catch {
            toast.error("Something went wrong. Please try again.", { toastId: item_id + "cartAddError" });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <button
            type="button"
            className={className}
            aria-label={ariaLabel}
            aria-busy={isPending}
            disabled={isPending}
            onClick={() => handleClick()}
        >
            {children ?? "Add to bag"}
        </button>
    )
}
