"use client"

import { OrderUpdateStatusAction } from '@/lib/OrderAction';
import { el } from '@faker-js/faker';
import { Order, OrderStatus } from '@prisma/client'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function EditOrder({ propsOrder }: { propsOrder: Order }) {
    const [status, setStatus] = useState<OrderStatus>(propsOrder.order_status);

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as OrderStatus;

        if (value === propsOrder.order_status) {
            toast.error("Status is already set to " + value);
            return
        }

        setStatus(value);
        // Here you can add the code to update the status in your database

        const res = await OrderUpdateStatusAction(propsOrder.id, value);
        if (res.error) {
            toast.error(res.message);
            return
        } else {
            toast.success("Status updated to " + value);
        }
    };

    return (
        <div>
            <label>
                Status:
                <select value={status} onChange={handleStatusChange}>
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="cancelled">cancelled</option>
                    <option value="received">received</option>
                </select>
            </label>
        </div>
    )
}
