"use client"

import prisma from "@/db/prisma";
import MainTable, { TableStructure } from "./Table/MainTable/TableStructure";
// import { listProduct } from "../api/fake.data/product";

const content: TableStructure = {
    id: "id",
    title: "Product",
    searchPath: "name",
    structure: [
        { label: "Name", path: "name", width: "280px", fontSize: "20px" },
        { label: "Price", path: "price", width: "200px", fontSize: "20px" },
        { label: "Category", path: "category", width: "250px", fontSize: "20px" },
    ]
};

export default function ProductTable({ data }: { data: any[] }) {

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
    }

    function onHandleUpdate(data: any) {
        // openModal(<ProductEditModal defaultValues={data} />)
    }
}
