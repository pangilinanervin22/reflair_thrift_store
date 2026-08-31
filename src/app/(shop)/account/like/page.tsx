
import style from "./page.module.scss";
import Image from "next/image";
import prisma from "@/db/prisma";
import RemoveLikeButton from "./RemoveLikeButton";
import AddCartButton from "../cart/AddCartButton";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { formatPeso } from "@/utils/formatPrice";

export default async function LikePage() {
    const user = await getSessionUser();
    if (!user) redirect("/login?callbackUrl=%2Faccount%2Flike");

    const like = await prisma.like.findUnique({
        where: { account_id: user.id },
        include: { product: true },
    });

    const product = like?.product ?? [];

    if (product.length === 0)
        return (
            <div className={style.no_item}>
                <p className={style.no_item_eyebrow}>Saved pieces</p>
                <h1>Nothing saved, yet.</h1>
                <p>Keep the pieces you love close — before someone else does.</p>
                <Link href="/product" className={style.back_button}>Continue shopping</Link>
            </div>
        );


    return (
        <section className={style.main_container}>
            <header className={style.head}>
                <h1>Saved pieces</h1>
                <p>{product.length} {product.length === 1 ? "piece" : "pieces"}</p>
            </header>
            <div className={style.product_container}>
                {product.map((item) => (
                    <article className={style.product_card} key={item.id}>
                        <Link href={"/product/" + item.id} className={style.frame}>
                            <Image
                                src={item.image}
                                width={400}
                                height={500}
                                sizes="(max-width: 480px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                alt={item.name}
                            />
                        </Link>
                        <div className={style.description}>
                            <h3>{item.name}</h3>
                            <p>Size {item.size}</p>
                            <p className={style.price}>{formatPeso(item.price)}</p>
                        </div>
                        <div className={style.actions_container}>
                            <AddCartButton item_id={item.id} className={style.cart}>Add to bag</AddCartButton>
                            <RemoveLikeButton item_id={item.id} className={style.remove}>Remove</RemoveLikeButton>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
