"use client"

import MainTable, { type TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { useState } from "react";
import type { Order } from "@prisma/client";
import formatDate from "@/utils/formatDate";
import { OrderDeleteAction } from "@/lib/OrderAction";
import { toast } from "react-toastify";
import StatusSpan from "@/components/status/StatusSpan";
import SortOrder from "./SortOrderAdmin";
import { formatPeso } from "@/utils/formatPrice";

export type OrderRow = Order & { account: { name: string; email: string } | null };

const content: TableStructure<OrderRow> = {
    id: "id",
    title: "Order",
    searchPath: "name",
    defaultSort: "order_date",
    defaultOrder: "desc",
    structure: [
        { label: "Name", path: "name", width: "300px", fontSize: "16px" },
        {
            label: "Order Date", path: "order_date", width: "200px",
            fontSize: "20px",
            element: ((val) => <span>{formatDate(val.order_date)}</span>),
        },
        { label: "Total Price", path: "total_price", width: "160px", fontSize: "16px", element: ((val) => <span>{formatPeso(val.total_price)}</span>) },
        {
            label: "Status", path: "order_status", width: "200px",
            fontSize: "20px",
            element: ((val) => <StatusSpan status={val.order_status} />),
        },
    ]
};

export default function OrderTable({ data, status }: { data: OrderRow[], status: string }) {
    const [pendingId, setPendingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!pendingId) return;
        const loading = toast.loading("Deleting order…");
        const res = await OrderDeleteAction(pendingId);
        if (res.ok)
            toast.update(loading, { render: res.message, type: "success", isLoading: false, autoClose: 2000 });
        else
            toast.update(loading, { render: res.message, type: "error", isLoading: false, autoClose: 3000 });
    }

    return (
        <div>
            <SortOrder status={status} />
            <Dialog open={pendingId !== null} onClose={() => setPendingId(null)} onOk={handleDelete}>
                <h2>Are you sure want to delete?</h2>
                <p>This order will be deleted and its pieces returned to the archive. You cannot undo this action.</p>
            </Dialog>
            <MainTable
                data={data}
                isEditable={true}
                structure={content}
                handleUpdate={(row) => router.push("/admin/order/" + row.id)}
                handleDelete={(row) => setPendingId(row.id)}
            />
        </div>
    );
}
