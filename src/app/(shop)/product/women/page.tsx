import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import AddCartButton from "../../cart/AddCartButton";
import AddLikeButton from "../../liked/AddLikeButton";


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
                <h3>{"Women's Clothing"}</h3>
                <br />
                <div className={style.product_container}>
                    {womenProduct.map((product) => (

                        <div className={style.ImageWrapper} key={product.id}>

                            <Image
                                src={product.image}
                                width={400}
                                height={400}
                                quality={100}
                                alt="main page pictures"
                            />
                            <section className={style.description}>
                                <h3>{product.name}</h3>
                                <h1>Size: {product.size}</h1>
                                <h1>₱ {product.price}</h1>
                            </section>

                            <section className={style.button}>
                                {/* <button className={style.cart}>ADD TO CART</button> */}
                                {/* <button className={style.like}>LIKE</button> */}
                                <AddCartButton product={product} title="ADD TO CART" className={style.cart} />
                                <AddLikeButton product={product} title="LIKE" className={style.like} />
                            </section>
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
