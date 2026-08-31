import prisma from "@/db/prisma";
import Link from "next/link";
import Image from "next/image";
import style from "./CategoryPage.module.scss";
import AddCartButton from "@/app/(shop)/account/cart/AddCartButton";
import AddLikeButton from "@/app/(shop)/account/like/AddLikeButton";
import { formatPeso } from "@/utils/formatPrice";
import type { ProductCategory } from "@/lib/constants";
import { CATEGORY_COPY } from "./categoryCopy";

// Shared body of /product/{men,women,shoes}. Each route file stays a tiny
// wrapper so the pages remain fully static (`revalidate = false`) with their
// own metadata. (A [category] segment can't coexist with the sibling [slug].)
export default async function CategoryPage({ category }: { category: ProductCategory }) {
    const copy = CATEGORY_COPY[category];
    const products = await prisma.product.findMany({
        where: { category, order: null },
        orderBy: { createdAt: "desc" },
    });
    const count = products.length;

    return (
        <section className={style.product_section}>
            <header className={style.page_head}>
                <p className={style.eyebrow}>The Archive</p>
                <h1>{copy.title}</h1>
                <p className={style.count}>
                    {count} {count === 1 ? copy.unit[0] : copy.unit[1]}
                </p>
            </header>
            {/* Plain GET form: searching hands off to the dynamic archive, so this page stays static */}
            <form className={style.search_form} action="/product" method="get" role="search">
                <input type="hidden" name="category" value={category} />
                <label htmlFor={"search-" + category}>Search {copy.title.toLowerCase()}</label>
                <input id={"search-" + category} name="search" type="search" placeholder="Search this rail…" />
                <button type="submit">Search</button>
            </form>
            <div className={style.product_container}>
                {count ? products.map((product, i) => (
                    <article className={style.product_card} key={product.id}>
                        <Link href={"/product/" + product.id} className={style.frame}>
                            <Image
                                src={product.image}
                                width={760}
                                height={950}
                                sizes="(max-width: 480px) 100vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 25vw"
                                priority={i < 2}
                                loading={i >= 2 && i < 4 ? "eager" : undefined}
                                alt={product.name}
                            />
                            <span className={style.view_tag}>View piece</span>
                        </Link>
                        <section className={style.description}>
                            <h3>{product.name}</h3>
                            <p>Size {product.size}</p>
                            <p className={style.price}>{formatPeso(product.price)}</p>
                        </section>
                        <section className={style.button_container}>
                            <AddCartButton item_id={product.id} className={style.cart}>Add to bag</AddCartButton>
                            <AddLikeButton item_id={product.id} className={style.like}>Save</AddLikeButton>
                        </section>
                    </article>
                )) :
                    <div className={style.no_item}>
                        <h2>The rail is empty, for now.</h2>
                        <p>{copy.emptyNote}</p>
                        <Link href="/product">Browse all pieces</Link>
                    </div>}
            </div>
        </section>
    );
}
