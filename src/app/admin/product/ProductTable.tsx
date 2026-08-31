"use client"

import MainTable, { type TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { ProductDeleteAction } from "@/lib/ProductAction";
import { useState } from "react";
import type { Product } from "@prisma/client";
import style from "./page.module.scss";
import { toast } from "react-toastify";
import { formatPeso } from "@/utils/formatPrice";

const content: TableStructure<Product> = {
    id: "id",
    title: "Product",
    searchPath: "name",
    defaultSort: "createdAt",
    defaultOrder: "desc",
    structure: [
        { label: "Image", width: "100px", element: (val) => <Image src={val.image} alt={val.name} width={60} height={50} sizes="60px" /> },
        { label: "Name", path: "name", width: "200px", fontSize: "16px" },
        { label: "Price", path: "price", width: "200px", fontSize: "16px", element: (val) => <span>{formatPeso(val.price)}</span> },
        { label: "Category", path: "category", width: "200px", fontSize: "16px" },
    ]
};

export default function ProductTable({ data }: { data: Product[] }) {
    const [pendingId, setPendingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!pendingId) return;
        const loading = toast.loading("Deleting product…");
        const res = await ProductDeleteAction(pendingId);
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
                    <p>This piece will be removed from the archive and its image deleted. You cannot undo this action.</p>
                </div>
            </Dialog>
            <MainTable
                data={data}
                isEditable={true}
                structure={content}
                handleUpdate={(row) => router.push("/admin/product/" + row.id)}
                handleDelete={(row) => setPendingId(row.id)}
                handleAdd={() => router.push("/admin/product/create")}
            />
        </>
    );
}
