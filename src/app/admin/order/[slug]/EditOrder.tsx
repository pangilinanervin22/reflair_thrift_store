"use client"

import { OrderUpdateAction, OrderUpdateStatusAction } from '@/lib/OrderAction';
import { Order, OrderStatus } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import style from './page.module.scss'
import { useRouter } from 'next/navigation';

export default function EditOrder({ propsOrder }: { propsOrder: Order }) {
    const router = useRouter();
    const [status, setStatus] = useState<OrderStatus>(propsOrder.order_status);


    const handleStatusChange = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const statusData = formData.get("order_status") as OrderStatus;
        const date = formData.get("order_date") as string;

        const toastId = toast.loading("Updating an order...");
        try {

            if (!statusData || !date) {
                toast.update(toastId, { type: "error", render: "Please fill in all fields", autoClose: 2000, isLoading: false });
                return;
            }

            if (new Date(date) < new Date(propsOrder.order_date)) {
                toast.update(toastId, { type: "error", render: "Order date cannot be before the current date", autoClose: 2000, isLoading: false });
                return;
            }

            const res = await OrderUpdateAction(propsOrder.id, { status: statusData, date });
            console.log(res);

            if (res.error) {
                toast.update(toastId, { type: "error", render: res.message, autoClose: 2000, isLoading: false });
                return;
            } else {
                toast.update(toastId, { type: "success", render: "Successfully updated order", autoClose: 2000, isLoading: false });
                router.push("/admin/order");
            }


        } catch (error) {
            console.error(error);
            toast.update(toastId, { type: "error", render: "An error occurred while updating the order", autoClose: 2000, isLoading: false });
        }
    };

    return (
        <form className={style.edit_order} onSubmit={handleStatusChange}>
            <div>
                <label htmlFor='order_status'>
                    Status
                </label>
                <select name='order_status' id='order_status' onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    defaultValue={propsOrder.order_status}>
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="cancelled">cancelled</option>
                    <option value="received" className={style.error}>received</option>
                </select>
            </div>
            <div>
                <label htmlFor="order_date">Shipped Date</label>
                <input type="date" name="order_date" id="order_date" required
                    defaultValue={propsOrder.ship_date ? propsOrder.ship_date.toISOString().split('T')[0] : ''}
                />
            </div>
            {cancelledReasonComponent(status)}
            <div className={style.edit_confirm}>
                <button type='submit'>Update Order</button>
            </div>
        </form>
    )
}

function cancelledReasonComponent(status: OrderStatus) {
    if (status === "cancelled") {
        return (
            <div>
                <label htmlFor='cancel'>
                    Cancelled Reason
                </label>
                <select name='cancel' id='cencel'>
                    <option value="Address not verfied">Address not verfied</option>
                    <option value="Product not available">Product not available</option>
                </select>
            </div>
        )
    }
    return null;
} 