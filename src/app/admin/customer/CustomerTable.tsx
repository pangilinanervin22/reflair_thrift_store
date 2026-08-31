"use client"

import MainTable, { type TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { useState } from "react";
import style from "./page.module.scss";
import { toast } from "react-toastify";
import { AccountDeleteAction } from "@/lib/AccountAction";

export type CustomerRow = {
    id: string;
    name: string;
    email: string;
    city: string;
    barangay: string | null;
    contact: string | null;
    order_count: number;
};

const content: TableStructure<CustomerRow> = {
    id: "id",
    title: "Customer",
    searchPath: "name",
    structure: [
        { label: "Name", path: "name", width: "200px", fontSize: "16px" },
        { label: "Email", path: "email", width: "260px", fontSize: "16px" },
        { label: "City", path: "city", width: "160px", fontSize: "16px" },
        { label: "Barangay", path: "barangay", width: "180px", fontSize: "16px" },
        {
            label: "Total Order", path: "order_count", width: "160px", fontSize: "16px",
            element: ((val) => <div>{val.order_count ? val.order_count : "none"} </div>)
        },
    ]
};

export default function CustomerTable({ data }: { data: CustomerRow[] }) {
    const [pendingId, setPendingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!pendingId) return;
        const loading = toast.loading("Deleting account…");
        const res = await AccountDeleteAction(pendingId);
        if (res.ok)
            toast.update(loading, { type: "success", render: res.message, isLoading: false, autoClose: 2000 });
        else
            toast.update(loading, { type: "error", render: res.message, isLoading: false, autoClose: 3000 });
    };

    return (
        <>
            <Dialog open={pendingId !== null} onClose={() => setPendingId(null)} onOk={handleDelete}>
                <div className={style.dialog}>
                    <h4>Are you sure want to delete?</h4>
                    <p>This account, its bag and its saved pieces will be deleted. You cannot undo this action.</p>
                </div>
            </Dialog>
            <MainTable
                data={data}
                isEditable={true}
                structure={content}
                handleUpdate={(row) => router.push("/admin/customer/" + row.id)}
                handleDelete={(row) => setPendingId(row.id)}
            />
        </>
    );
}
