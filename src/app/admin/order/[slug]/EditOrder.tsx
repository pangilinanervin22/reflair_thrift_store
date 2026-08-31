"use client"

import { OrderUpdateAction } from '@/lib/OrderAction';
import { Order, OrderStatus } from '@prisma/client'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import style from './page.module.scss'
import { useRouter } from 'next/navigation';
import { ORDER_TRANSITIONS } from '@/lib/orderStatus';
import { CANCEL_REASONS, OrderAdminUpdateSchema } from '@/lib/schemas/order';

export default function EditOrder({ propsOrder }: { propsOrder: Order }) {
    const router = useRouter();
    const [status, setStatus] = useState<OrderStatus>(propsOrder.order_status);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // The current status plus whatever the transition table allows from it
    const options: OrderStatus[] = [propsOrder.order_status, ...ORDER_TRANSITIONS[propsOrder.order_status]];
    const terminal = ORDER_TRANSITIONS[propsOrder.order_status].length === 0;
    const cancelling = status === "cancelled" && propsOrder.order_status !== "cancelled";

    const handleStatusChange = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(event.currentTarget);
        // Same schema the server enforces — instant feedback without a round-trip
        const parsed = OrderAdminUpdateSchema.safeParse({
            status: formData.get("order_status"),
            ship_date: String(formData.get("ship_date") ?? "") || undefined,
            cancel_reason: cancelling ? String(formData.get("cancel_reason") ?? "") || undefined : undefined,
        });
        if (!parsed.success) {
            toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Updating the order…");
        try {
            const res = await OrderUpdateAction(propsOrder.id, parsed.data);
            if (res.ok) {
                toast.update(toastId, { type: "success", render: res.message, autoClose: 2000, isLoading: false });
                router.push("/admin/order");
                router.refresh();
            } else {
                toast.update(toastId, { type: "error", render: res.message, autoClose: 3000, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            toast.update(toastId, { type: "error", render: "An error occurred while updating the order", autoClose: 2000, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={style.edit_order} onSubmit={handleStatusChange}>
            <div>
                <label htmlFor='order_status'>
                    Status
                </label>
                <select
                    name='order_status'
                    id='order_status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    disabled={terminal}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="ship_date">Ship date{status === "shipped" ? "" : " (optional)"}</label>
                <input
                    type="date"
                    name="ship_date"
                    id="ship_date"
                    required={status === "shipped"}
                    defaultValue={propsOrder.ship_date ? propsOrder.ship_date.toISOString().split('T')[0] : ''}
                />
            </div>
            {cancelling && (
                <div>
                    <label htmlFor='cancel_reason'>Cancellation reason</label>
                    <select name='cancel_reason' id='cancel_reason' defaultValue={CANCEL_REASONS[0]}>
                        {CANCEL_REASONS.map((reason) => (
                            <option key={reason} value={reason}>{reason}</option>
                        ))}
                    </select>
                    <p className={style.error}>Cancelling returns the order&apos;s pieces to the archive.</p>
                </div>
            )}
            <div className={style.edit_confirm}>
                <button type='submit' disabled={isSubmitting || terminal}>
                    {terminal ? "Order " + propsOrder.order_status : "Update order"}
                </button>
            </div>
        </form>
    )
}
