"use client"

import MainTable, { TableStructure } from "./Table/MainTable/TableStructure";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
// import { listProduct } from "../api/fake.data/product";

const content: TableStructure = {
    id: "id",
    title: "Product",
    searchPath: "name",
    structure: [
        { label: "Image", width: "100px", element: (val: any) => <Image src={val.image} alt={val.image} width={70} height={70} /> },
        { label: "Name", path: "name", width: "200px", fontSize: "16px" },
        { label: "Price", path: "price", width: "200px", fontSize: "16px" },
        { label: "Category", path: "category", width: "200px", fontSize: "16px" },
    ]
};

export default function ProductTable({ data }: { data: any[] }) {
    const router = useRouter();

    return (<MainTable
        data={data}
        isEditable={true}
        structure={content}
        handleUpdate={onHandleUpdate}
        handleDelete={onHandleDelete}
        handleAdd={onHandleAdd} />
    );

    function onHandleDelete(data: any) {
        console.log(data);
        // openModal(<DeleteModal confirmAction={() => toast.success("Successfully Deleted ")} />)
    }

    function onHandleAdd() {
        // openModal(<ProductAddModal />)
        console.log("hello");

        router.push("/admin/product/create");
    }

    function onHandleUpdate(data: any) {
        // openModal(<ProductEditModal defaultValues={data} />)
    }
}
