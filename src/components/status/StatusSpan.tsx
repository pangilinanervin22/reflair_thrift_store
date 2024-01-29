import React from 'react'
import style from "./Status.module.scss";
import { OrderStatus } from '@prisma/client';





export default function StatusSpan({ status }: { status: OrderStatus }) {

    const statusClasses = {
        pending: style.pending,
        processing: style.processing,
        shipped: style.shipped,
        cancelled: style.cancelled,
        received: style.received,
    };

    return (
        <div className={`${style.status} ${statusClasses[status]}`}>
            {status}
        </div>
    )
}
