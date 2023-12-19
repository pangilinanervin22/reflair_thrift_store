"use client"

import MainTable, { TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { useState } from "react";
import { Order } from "@prisma/client";
import formatDate from "@/utils/formatDate";
import { OrderDeleteAction } from "@/lib/OrderAction";
import { toast } from "react-toastify";

const content: TableStructure = {
    id: "id",
    title: "Order",
    searchPath: "name",
    structure: [
        { label: "Name", path: "name", width: "300px", fontSize: "16px" },
        { label: "ID", path: "id", width: "300px", fontSize: "16px" },
        {
            label: "Order Date", path: "order_date", width: "200px",
            fontSize: "20px",
            element: ((val) => <span>{formatDate(val["order_date"])}</span>),
        },
        { label: "Total Price", path: "total_price", width: "160px", fontSize: "16px" },
        { label: "Status", path: "order_status", width: "100px", fontSize: "16px" },
    ]
};

export default function OrderTable({ data }: { data: Order[] }) {
    const [currentProductId, setCurrentProductId] = useState<string>("");
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const loading = toast.loading("Order deleting...");
        const order = await OrderDeleteAction(id);


        if (order.ok) {
            toast.update(loading, { render: order.message, type: "success", isLoading: false, autoClose: 2000 });
            return;
        } else if (order.error) {
            toast.update(loading, { render: order.message, type: "error", isLoading: false, autoClose: 2000 });
            return;
        }
    }

    return (
        <>
            <Dialog onClose={() => { }} onOk={() => handleDelete(currentProductId)}>
                <h2>Are you sure want to delete?</h2>
                <p>This will order will delete. You cannot undo this action.</p>
            </Dialog>
            <MainTable
                data={data}
                isEditable={true}
                structure={content}
                handleUpdate={onHandleUpdate}
                handleDelete={onHandleDelete}
            />
        </>
    );

    function onHandleDelete(data: any) {
        console.log(data.id);

        setCurrentProductId(data.id);
        router.push(`/admin/order?showDialog=y`);
    }

    function onHandleUpdate(data: any) {
        router.push(`/admin/order/${data.id}`);
    }
}
