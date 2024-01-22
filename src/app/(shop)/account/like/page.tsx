
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

    console.log();

    if (!product || !product.length)
        return (
            <div className={style.main_container}>
                <div className={style.cart_pic}>
                    <Image src={"/assets/images/like_img.webp"} alt='wew' width={"100"} height={"100"} />
                </div>
                <h1 className={style.no_item}>
                    You currently have no liked items.</h1>
                <Link href={"/product"}>
                    <button className={style.back_button}>
                        CONTINUE SHOPPING
                    </button>
                </Link>
            </div>
        )


    return (
        <section className={style.main_container}>
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
                            <h4>{item.name}</h4>
                            <p>Size: {item.size}</p>
                            <p>₱ {item.price}</p>
                        </div>
                        <div className={style.actions_container}>
                            <AddCartButton email={account.email} item_id={item.id}>
                                <button className={style.cart}>ADD TO CART</button>
                            </AddCartButton>
                            <RemoveLikeButton email={account.email} item_id={item.id} >
                                <button className={style.remove}>REMOVE</button>
                            </RemoveLikeButton>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
