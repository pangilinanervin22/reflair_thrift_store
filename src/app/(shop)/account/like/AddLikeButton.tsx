"use client"

import { LikeAddAction } from '@/lib/LikeAction'
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
export default function AddLikeButton({ item_id, className, ariaLabel, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { status } = useSession();
    const [isPending, setIsPending] = React.useState(false);

    const goToLogin = () => {
        toast.error("Please log in to save pieces", { toastId: "loginRequired" });
        router.push("/login?callbackUrl=" + encodeURIComponent(pathname));
    };

    async function handleClick() {
        if (isPending) return;
        if (status === "unauthenticated") return goToLogin();

        setIsPending(true);
        try {
            const res = await LikeAddAction(item_id);
            if (res.ok) {
                toast.success(res.message, { toastId: item_id + "likeAddSuccess" });
            } else if (res.code === "UNAUTHENTICATED") {
                goToLogin();
            } else {
                toast.error(res.message, { toastId: item_id + "likeAddError" });
            }
        } catch {
            toast.error("Something went wrong. Please try again.", { toastId: item_id + "likeAddError" });
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
            {children ?? "Save"}
        </button>
    )
}
