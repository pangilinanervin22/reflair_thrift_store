import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";


export default async function ProductShoesPage() {
    const session = await getServerSession(authOptions);
    const shoesProduct = await prisma.product.findMany({
        where: {
            category: "shoes"
        }
    });

    console.log("shoes");
    return (
        <>
            <section className={style.product_section}>
                <br />
                <h3>Shoes Collection</h3>
                <br />
                <div className={style.product_container}>
                    {shoesProduct.map((product) => (
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
                            <section className={style.button_container}>
                                <AddCartButton session={session} product={product} title="ADD TO CART"  >
                                    <button className={style.cart}>ADD TO CART</button>
                                </AddCartButton>
                                <AddLikeButton session={session} product={product} title="ADD TO CART"  >
                                    <button className={style.like}>LIKE</button>
                                </AddLikeButton>
                            </section>
                        </div>
                    ))}
                </div>
            </section>

        </>
    );
}