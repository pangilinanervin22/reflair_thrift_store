
import style from "./page.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import RemoveLikeButton from "./RemoveLikeButton";
import AddCartButton from "../cart/AddCartButton";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LikePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user)
        redirect("/login");

    const account = await prisma.account.findUnique({
        where: {
            email: session?.user.email,
        },
        include: {
            like: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!account) {
        return <h1>no account</h1>;
    }

    const product = account.like?.product;

    if (!product || !product.length)
        return (
            <div className={style.no_item}>
                <p className={style.no_item_eyebrow}>Saved pieces</p>
                <h2>Nothing saved, yet.</h2>
                <p>Keep the pieces you love close — before someone else does.</p>
                <Link href={"/product"}>
                    <button className={style.back_button}>
                        Continue shopping
                    </button>
                </Link>
            </div>
        );


    return (
        <section className={style.main_container}>
            <header className={style.head}>
                <h2>Saved pieces</h2>
                <p>{product.length} {product.length === 1 ? "piece" : "pieces"}</p>
            </header>
            <div className={style.product_container}>
                {product.map((item) => (
                    <article className={style.product_card} key={item.id}>
                        <Link href={`/product/${item.id}`} className={style.frame}>
                            <Image
                                src={item.image}
                                width={400}
                                height={500}
                                sizes="(max-width: 480px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                alt={item.name}
                            />
                        </Link>
                        <div className={style.description}>
                            <h4>{item.name}</h4>
                            <p>Size {item.size}</p>
                            <p className={style.price}>₱ {item.price}</p>
                        </div>
                        <div className={style.actions_container}>
                            <AddCartButton email={account.email} item_id={item.id}>
                                <button className={style.cart}>Add to bag</button>
                            </AddCartButton>
                            <RemoveLikeButton email={account.email} item_id={item.id} >
                                <button className={style.remove}>Remove</button>
                            </RemoveLikeButton>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
