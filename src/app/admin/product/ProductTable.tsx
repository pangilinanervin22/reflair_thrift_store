"use client"

import MainTable, { TableStructure } from "../../../components/AdminComponent/Table/TableStructure";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Dialog from "../../../components/Dialog/Dialog";
import { ProductDeleteAction } from "@/lib/ProductAction";
import { useState } from "react";
import { Product } from "@prisma/client";

const content: TableStructure = {
    id: "id",
    title: "Product",
    searchPath: "name",
    structure: [
        { label: "Image", width: "100px", element: (val: any) => <Image src={val.image} alt={val.image} width={60} height={50} /> },
        { label: "Name", path: "name", width: "200px", fontSize: "16px" },
        { label: "Price", path: "price", width: "200px", fontSize: "16px" },
        { label: "Category", path: "category", width: "200px", fontSize: "16px" },
    ]
};

export default function ProductTable({ data }: { data: Product[] }) {
    const [currentProductId, setCurrentProductId] = useState<any>("");
    const router = useRouter();

    return (
        <>
            <Dialog onClose={() => { }} onOk={() => { ProductDeleteAction(currentProductId) }}>
                <h2>Are you sure want to delete?</h2>
                <p>This will product will delete. You cannot undo this action.</p>
            </Dialog>
            <MainTable
                data={data}
                isEditable={true}
                structure={content}
                handleUpdate={onHandleUpdate}
                handleDelete={onHandleDelete}
                handleAdd={onHandleAdd}
            />
        </>
    );

    function onHandleDelete(data: any) {
        setCurrentProductId(data.id);
        router.push(`/admin/product?showDialog=y`);
    }

    function onHandleAdd() {
        router.push("/admin/product/create");
    }

    function onHandleUpdate(data: any) {
        router.push(`/admin/product/${data.id}`);
    }
}