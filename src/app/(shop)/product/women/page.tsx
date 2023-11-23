import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import type { Product } from "@prisma/client";


export const revalidate = 2;

export default async function ProductDashboard() {
    const womenProduct = await prisma.product.findMany({
        where: {
            category: "women"
        }
    });

    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>All Products for Women</h3>
                <br />
                <div className={style.product_container}>
                    {womenProduct.map((product) => (
                        <div key={product.id}>
                            {product.name}
                            {product.price}
                        </div>
                    ))}
                </div>
            </section>
            <Link href="/admin/product/create">
                <button>Add Product</button>
            </Link>
        </>
    );
}
