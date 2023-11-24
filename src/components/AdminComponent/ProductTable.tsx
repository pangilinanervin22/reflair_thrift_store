"use client"

import MainTable, { TableStructure } from "./Table/MainTable/TableStructure";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModalStore } from "../Modal/ModalContainer";
import DeleteModal from "../Modal/common/DeleteModal";
import { DeleteProductAction } from "@/lib/ProductAction";

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
    const { openModal } = useModalStore();

    return (<MainTable
        data={data}
        isEditable={true}
        structure={content}
        handleUpdate={onHandleUpdate}
        handleDelete={onHandleDelete}
        handleAdd={onHandleAdd} />
    );

    function onHandleDelete(data: any) {
        openModal(<DeleteModal confirmAction={() => {
            DeleteProductAction(data.id);
            console.log("Successfully Deleted " + data)
        }} />)
    }

    function onHandleAdd() {
        // openModal(<ProductAddModal />)
        console.log("hello");
        router.push("/admin/product/create");
    }

    function onHandleUpdate(data: any) {
        router.push(`/admin/product/${data.id}`);
    }
}