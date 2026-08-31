
import style from "./page.module.scss";
import prisma from "@/db/prisma";
import Image from "next/image";
import RemoveCartButton from "./RemoveCartButton";
import { redirect } from "next/navigation";
import Link from "next/link";
import IconTrash_svg from "@/assets/IconTrash_svg";
import AddLikeButton from "../like/AddLikeButton";
import IconHeartAdd_svg from "@/assets/IconHeartAdd._svg";
import { getSessionUser } from "@/lib/auth";
import { formatPeso } from "@/utils/formatPrice";

export default async function CartPage() {
    const user = await getSessionUser();
    if (!user) redirect("/login?callbackUrl=%2Faccount%2Fcart");

    const cart = await prisma.cart.findUnique({
        where: { account_id: user.id },
        include: { product: true },
    });

    const product = cart?.product ?? [];
    const total_price = product.reduce((total, item) => total + item.price, 0);

    if (product.length === 0)
        return (
            <div className={style.no_item}>
                <p className={style.no_item_eyebrow}>Shopping bag</p>
                <h1>Your bag is empty.</h1>
                <p>One-of-a-kind pieces wait for no one.</p>
                <Link href="/product" className={style.back_button}>Continue shopping</Link>
            </div>
        );

    return (
        <div className={style.main_container}>
            <header className={style.head}>
                <h1>Shopping bag</h1>
                <p className={style.with_item}>
                    {product.length} {product.length === 1 ? "piece" : "pieces"}
                </p>
            </header>
            <div className={style.product_container}>
                {product.map((item) => (
                    <div className={style.product_card} key={item.id}>
                        <div className={style.description}>
                            <Link href={"/product/" + item.id} className={style.thumb}>
                                <Image
                                    src={item.image}
                                    width={176}
                                    height={220}
                                    sizes="88px"
                                    alt={item.name}
                                />
                            </Link>
                            <div className={style.text}>
                                <h3>{item.name}</h3>
                                <p>Size {item.size}</p>
                            </div>
                        </div>
                        <div className={style.action}>
                            <p>{formatPeso(item.price)}</p>
                            <div>
                                <AddLikeButton item_id={item.id} className={style.icon_button} ariaLabel={"Save " + item.name + " for later"}>
                                    <span aria-hidden="true"><IconHeartAdd_svg /></span>
                                </AddLikeButton>
                                <RemoveCartButton item_id={item.id} className={style.icon_button} ariaLabel={"Remove " + item.name + " from bag"}>
                                    <span aria-hidden="true"><IconTrash_svg /></span>
                                </RemoveCartButton>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className={style.checkout}>
                <div className={style.subtotal}>
                    <span className={style.subtotal_label}>Subtotal</span>
                    <p>{formatPeso(total_price)}</p>
                </div>
                <Link href="/account/checkout" className={style.checkout_link}>Checkout</Link>
            </div>
        </div>
    );
}
