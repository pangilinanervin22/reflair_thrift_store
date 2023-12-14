
import { useState } from "react";
import style from "./page.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import { redirect } from "next/navigation";
import prisma from "@/db/prisma";
import AddCartButton from "../cart/AddCartButton";
import AddLikeButton from "./AddLikeButton";
import RemoveCartButton from "../cart/RemoveCartButton";
import RemoveLikeButton from "./RemoveLikeButton";

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
    return (
        <>
            <section className={style.flex_section}>
                {product?.length ?
                    <>
                        <h1>Total Liked: {product.length}</h1>
                        <div className={style.product_container}>
                            {product.map((item) => (
                                <div className={style.product_card} key={item.id}>
                                    <Image
                                        src={item.image}
                                        width={400}
                                        height={400}
                                        quality={100}
                                        alt="liked pic"
                                    />
                                    <div className={style.description}>
                                        <h3>{item.name}</h3>
                                        <h1>Size: {item.size}</h1>
                                        <h1>₱ {item.price}</h1>
                                    </div>
                                    <div className={style.actions_container}>
                                        <AddCartButton session={session} product={item} title="ADD TO CART"  >
                                            <button className={style.cart}>ADD TO CART</button>
                                        </AddCartButton>
                                        <RemoveLikeButton classStyle={style.remove} email={account.email} item_id={item.id} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </> : <h1>No Liked Product</h1>}
            </section>
        </>
    );
}
