import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import type { Product } from "@prisma/client";


export const revalidate = 2;

export default async function ProductDashboard() {
    const menProduct = await prisma.product.findMany({
        where: {
            category: "men"
        }
    });

    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>All Products for Men</h3>
                <br />
                <div className={style.product_container}>
                    {menProduct.map((product) => (
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
