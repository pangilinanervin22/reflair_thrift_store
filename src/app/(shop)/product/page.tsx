
import prisma from "@/db/prisma"
import Image from 'next/image'
import style from "./page.module.scss";
import Link from "next/link";

export const revalidate = 2

export default async function ProductDashboard() {
    const product = await prisma.product.findMany();
    console.log(product, "hello");

    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>All Product</h3>
                <br />
                <div className={style.product_container} >
                    {product.map((product) => (
                        <div className={style.product_card} key={product.id}>
                            <Image src={product.image} alt="Picture of the product" width={1920} height={1080} />
                            <div className={style.product_description}>
                                <h3>{product.name}</h3>
                                <p>{product.size}</p>
                                <h4>{`₱ ${product.price}`}</h4>
                            </div>
                            <div className={style.product_action}>
                                <button className={style.product_cart}><p>ADD TO CART</p></button>
                                <button className={style.product_like}><p>LIKE</p></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Link href="/admin/product/create"><button>Add Product</button></Link>
            {/* <SignOut /> */}
        </>
    )
}
