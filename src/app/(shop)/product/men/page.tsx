import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@prisma/client";
import AddCartButton from "../../cart/AddCartButton";
import AddLikeButton from "../../liked/AddLikeButton";

// export const fetchCache = "no-store";

export default async function ProductDashboard() {
    const menProduct = await prisma.product.findMany({
        where: {
            category: "men"
        }
    });

    console.log("men");


    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>{"Men's Clothing"}</h3>
                <br />
                <div className={style.product_container}>
                    {menProduct.map((product) => (
                        <div className={style.product_card} key={product.id}>
                            <Link href={`/product/` + product.id}>
                                <Image
                                    src={product.image}
                                    width={400}
                                    height={400}
                                    quality={100}
                                    alt="main page pictures"
                                />
                            </Link>
                            <section className={style.description}>
                                <h3>{product.name}</h3>
                                <h1>Size: {product.size}</h1>
                                <h1>₱ {product.price}</h1>
                            </section>

                            <section className={style.button}>
                                <AddCartButton product={product} title="ADD TO CART" className={style.cart} />
                                <AddLikeButton product={product} title="LIKE" className={style.like} />
                            </section>

                        </div>
                    ))}
                </div>
            </section>

        </>
    );
}
