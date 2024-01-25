"use client"

import MainTable, { TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { useState } from "react";
import { Account } from "@prisma/client";
import style from "./page.module.scss";
import { toast } from "react-toastify";
import { AccountDeleteAction } from "@/lib/AccountAction";

const content: TableStructure = {
    id: "id",
    title: "Customer",
    searchPath: "name",
    structure: [
        { label: "Name", path: "name", width: "200px", fontSize: "16px" },
        { label: "Email", path: "email", width: "260px", fontSize: "16px" },
        { label: "City", path: "city", width: "200px", fontSize: "16px" },
        { label: "Barangay", path: "barangay", width: "200px", fontSize: "16px" },
    ]
};

export default function CustomerTable({ data }: { data: Account[] }) {
    const [currentAccountId, setCurrentAccountId] = useState<any>("");
    const router = useRouter();

    return (
        <>
            <Dialog onClose={() => { }} onOk={async () => {
                const loading = toast("Deleting account...");

                const res = await AccountDeleteAction(currentAccountId)

                if (res.ok)
                    toast.update(loading, { type: "success", render: res.message });
                else if (res.error)
                    toast.update(loading, { type: "error", render: res.message });
                else
                    toast.update(loading, { type: "error", render: "Something went wrong!" });
            }}>
                <div className={style.dialog}>
                    <h4>Are you sure want to delete?</h4>
                    <p>This will account will delete. You cannot undo this action.</p>
                </div>
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
        setCurrentAccountId(data.id);
        router.push(`/admin/customer?showDialog=y`);
    }

    function onHandleUpdate(data: any) {
        router.push(`/admin/customer/${data.id}`);
    }
}
