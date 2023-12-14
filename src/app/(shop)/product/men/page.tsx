import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import AddCartButton from "../../cart/AddCartButton";
import AddLikeButton from "../../like/AddLikeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";

// export const fetchCache = "no-store";

export default async function ProductDashboard() {
    const session = await getServerSession(authOptions);
    const menProduct = await prisma.product.findMany({
        where: {
            category: "men"
        }
    });
    console.log(session, "session");

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
