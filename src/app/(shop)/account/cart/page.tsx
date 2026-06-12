
import style from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import Image from "next/image";
import RemoveCartButton from "./RemoveCartButton";
import { redirect } from "next/navigation";
import Link from "next/link";
import IconTrash_svg from "@/assets/IconTrash_svg";
import AddLikeButton from "../like/AddLikeButton";
import IconHeartAdd_svg from "@/assets/IconHeartAdd._svg";

export default async function CartPage() {

    const session = await getServerSession(authOptions);
    if (!session?.user)
        redirect("/login");

    const account = await prisma.account.findUnique({
        where: {
            email: session?.user.email,
        },
        include: {
            cart: {
                include: {
                    product: true,
                },
            },
        },
    });


    if (!account)
        redirect("/login");


    const product = account.cart?.product;
    const total_price = product?.reduce((total, item) => total + item.price, 0);

    if (product?.length === 0 || !product)
        return (
            <div className={style.no_item}>
                <p className={style.no_item_eyebrow}>Shopping bag</p>
                <h2>Your bag is empty.</h2>
                <p>One-of-a-kind pieces wait for no one.</p>
                <Link href={"/product"}>
                    <button className={style.back_button}>
                        Continue shopping
                    </button>
                </Link>
            </div>
        );

    return (
        <div className={style.main_container}>
            <header className={style.head}>
                <h2>Shopping bag</h2>
                <p className={style.with_item}>
                    {product.length} {product.length === 1 ? "piece" : "pieces"}
                </p>
            </header>
            <div className={style.product_container}>
                {product.map((item) => (
                    <div className={style.product_card} key={item.id}>
                        <div className={style.description}>
                            <Link href={`/product/${item.id}`} className={style.thumb}>
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
                            <p>₱ {item.price}</p>
                            <div>
                                <AddLikeButton email={account.email} item_id={item.id} >
                                    <IconHeartAdd_svg />
                                </AddLikeButton>
                                <RemoveCartButton email={account.email} item_id={item.id} >
                                    <IconTrash_svg />
                                </RemoveCartButton>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className={style.checkout}>
                <div className={style.subtotal}>
                    <h4>Subtotal</h4>
                    <p>₱ {total_price}</p>
                </div>
                <Link href={"/account/checkout"}>
                    <button>Checkout</button>
                </Link>
            </div>
        </div>
    );
}
