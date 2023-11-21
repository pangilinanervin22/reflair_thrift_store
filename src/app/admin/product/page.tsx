
import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"
import Image from 'next/image'
import style from "./page.module.scss";
import ProductTable from "@/components/admin/ProductTable";

export const revalidate = 2

export default async function ProductDashboard() {

    const data = await prisma.product.findMany();


    return (
        <>
            <ProductTable data={data} />

        </>
    )
}
