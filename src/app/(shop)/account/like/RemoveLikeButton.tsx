"use client"

import { LikeRemoveAction } from '@/lib/LikeAction'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    item_id: string;
    className?: string;
    /** For icon-only usage — gives the control an accessible name */
    ariaLabel?: string;
    children?: React.ReactNode;
}

// Only rendered on session-gated pages; the server action verifies the session anyway.
export default function RemoveLikeButton({ item_id, className, ariaLabel, children }: Props) {
    const router = useRouter();
    const [isPending, setIsPending] = React.useState(false);

    async function handleClick() {
        if (isPending) return;
        setIsPending(true);
        try {
            const res = await LikeRemoveAction(item_id);
            if (res.ok) {
                toast.success(res.message, { toastId: item_id + "likeRemoveSuccess" });
                router.refresh();
            } else {
                toast.error(res.message, { toastId: item_id + "likeRemoveError" });
                if (res.code === "UNAUTHENTICATED") router.push("/login?callbackUrl=%2Faccount%2Flike");
            }
        } catch {
            toast.error("Something went wrong. Please try again.", { toastId: item_id + "likeRemoveError" });
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
            {children ?? "Remove from saved"}
        </button>
    )
}
