import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";

// Fully static: cached indefinitely, regenerated ONLY when a mutation calls
// revalidateStorefront() — zero compute while the catalogue is unchanged.
export const revalidate = false;

export default async function ProductMenPage() {
    const menProduct = await prisma.product.findMany({
        where: {
            category: "men",
            order: null
        }
    });

    return (
        <section className={style.product_section}>
            <header className={style.page_head}>
                <p className={style.eyebrow}>The Archive</p>
                <h2>{"Men's clothing"}</h2>
                <p className={style.count}>
                    {menProduct.length} {menProduct.length === 1 ? "piece" : "pieces"}
                </p>
            </header>
            <div className={style.product_container}>
                {menProduct.length ? menProduct.map((product, i) => (
                    <article className={style.product_card} key={product.id}>
                        <Link href={`/product/` + product.id} className={style.frame}>
                            <Image
                                src={product.image}
                                width={760}
                                height={950}
                                sizes="(max-width: 480px) 100vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 25vw"
                                loading={i < 4 ? "eager" : undefined}
                                alt={product.name}
                            />
                            <span className={style.view_tag}>View piece</span>
                        </Link>
                        <section className={style.description}>
                            <h3>{product.name}</h3>
                            <p>Size {product.size}</p>
                            <h4>₱ {product.price}</h4>
                        </section>
                        <section className={style.button_container}>
                            <AddCartButton item_id={product.id}  >
                                <button className={style.cart}>Add to bag</button>
                            </AddCartButton>
                            <AddLikeButton item_id={product.id}  >
                                <button className={style.like}>Save</button>
                            </AddLikeButton>
                        </section>
                    </article>
                )) :
                    <div className={style.no_item}>
                        <h2>The rail is empty, for now.</h2>
                        <p>New one-of-a-kind pieces are added weekly.</p>
                        <Link href={"/product"}>
                            <button>Browse all pieces</button>
                        </Link>
                    </div>}
            </div>
        </section>
    );
}
