"use client"

import MainTable, { TableStructure } from "./Table/TableStructure";
import { useRouter } from "next/navigation";
import { useModalStore } from "../Modal/ModalContainer";
import DeleteModal from "../Modal/common/DeleteModal";

const content: TableStructure = {
    id: "id",
    title: "Account",
    searchPath: "name",
    structure: [
        { label: "Name", path: "name", width: "250px", height: "50px", fontSize: "20px", },
        { label: "Username", path: "email", width: "200px", height: "50px", fontSize: "20px" },
        { label: "Role", path: "role", width: "200px", height: "50px", fontSize: "20px" },
    ]
};

export default function AccountTable({ data }: { data: any[] }) {
    const router = useRouter();
    const { openModal } = useModalStore();

    return (<MainTable
        data={data}
        isEditable={true}
        structure={content}
        handleUpdate={onHandleUpdate}
        handleDelete={onHandleDelete}
        handleAdd={onHandleAdd}
    />
    );

    function onHandleDelete(data: any) {
        openModal(<DeleteModal confirmAction={() => {
            // DeleteProductAction(data.id);
            console.log("Successfully Deleted " + data)
        }} />)
    }

    function onHandleAdd() {
        // openModal(<ProductAddModal />)
        console.log("hello");
        // router.push("/admin/product/create");
    }

    function onHandleUpdate(data: any) {
        // router.push(`/admin/product/${data.id}`);
    }
}
