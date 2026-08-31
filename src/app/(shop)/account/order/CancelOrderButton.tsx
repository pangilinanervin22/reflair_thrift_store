"use client"

import { OrderCancelAction } from '@/lib/OrderAction';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'react-toastify';

interface Props {
    order_id: string;
    classStyle?: string;
}

// Two-step confirm: the first click arms the button ("Confirm cancellation?"),
// a second click within 5 s cancels. Ownership and status are checked server-side.
export default function CancelOrderButton({ order_id, classStyle }: Props) {
    const router = useRouter();
    const [armed, setArmed] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!armed) return;
        const timer = setTimeout(() => setArmed(false), 5000);
        return () => clearTimeout(timer);
    }, [armed]);

    const handleClick = () => {
        if (isPending) return;
        if (!armed) {
            setArmed(true);
            return;
        }
        startTransition(async () => {
            const res = await OrderCancelAction(order_id);
            if (res.ok) {
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(res.message);
            }
            setArmed(false);
        });
    };

    return (
        <button type="button" className={classStyle} onClick={handleClick} disabled={isPending} aria-busy={isPending}>
            {isPending ? "Cancelling…" : armed ? "Confirm cancellation?" : "Cancel order"}
        </button>
    )
}
