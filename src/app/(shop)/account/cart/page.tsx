
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
import IconHeart_svg from "@/assets/IconHeart_svg";
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
        return <div className={style.main_container}>
            <div className={style.cart_pic}>
                        {/* Add your image tag or component here */}
                        <Image src={"/assets/images/shopping.png"} alt='wew' width={"100"} height={"100"} />
                    </div>
            <h1 className={style.no_item}>
                There are no items in this cart.</h1>
                <button className={style.back_button}> 
                CONTINUE SHOPPING</button>
                </div>;

    return (
        <div className={style.main_container}>
            <p className={style.with_item}>Product in cart: {product.length}</p>
            <div className={style.product_container}>
                {product.map((item) => (
                    <div className={style.product_card} key={item.id}>
                        <div className={style.description}>
                            <Image
                                src={item.image}
                                width={400}
                                height={400}
                                quality={100}
                                alt="product cart pic"
                            />
                            <div className={style.text}>
                                <h3>{item.name}</h3>
                                <p>{`Size: ${item.size}`}</p>
                            </div>
                        </div>
                        <div className={style.action}>
                            <p>₱ {item.price} </p>
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
                <Link href={"/account/checkout"}>
                    <button>Checkout</button>
                </Link>
                <div>
                    <p>{`₱ ${total_price}` || "₱ xxxx"}</p>
                    <h4>Subtotal:</h4>
                </div>
            </div>
        </div>
    );
}
