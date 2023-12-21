
import style from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import Image from "next/image";
import RemoveCartButton from "./RemoveCartButton";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

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
        return <div className={style.main_container}><h1 className={style.no_item}>No product in cart</h1></div>;

    return (
        <>
            <div className={style.main_container}>
                <h3 className={style.with_item}>Product in cart: {product.length}</h3>
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
                                <RemoveCartButton email={account.email} item_id={item.id} />
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className={style.checkout}>
                    <Link href={"/checkout"}>
                        <button>Checkout</button>
                    </Link>
                    <div>
                        <p>{`₱ ${total_price}` || "₱ xxxx"}</p>
                        <h4>Subtotal:</h4>
                    </div>
                </div>
            </div>
        </>
    );
}
