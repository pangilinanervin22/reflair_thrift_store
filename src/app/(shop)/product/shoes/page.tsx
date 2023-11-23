import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import type { Product } from "@prisma/client";


export const revalidate = 2;

export default async function ProductDashboard() {
    const shoesProduct = await prisma.product.findMany({
        where: {
            category: "shoes"
        }
    });

    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>All Products for Shoes</h3>
                <br />
                <div className={style.product_container}>
                    {shoesProduct.map((product) => (
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