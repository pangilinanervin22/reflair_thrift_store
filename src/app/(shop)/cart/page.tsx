
import style from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";
import Image from "next/image";
import { CartProductRemoveAction } from "@/lib/CartAction";
import RemoveCartButton from "./RemoveCartButton";
import { redirect } from "next/navigation";

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

    if (!account) {
        return <h1>no account</h1>;
    }

    const product = account.cart?.product;
    const total_price = product?.reduce((total, item) => total + item.price, 0);

    return (
        <>
            <section className={style.flex_section}>
                {product?.length ?
                    <>
                        <h3>Product in Cart: {product.length}</h3>
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
                        <div className={style.checkout}>
                            <button>CHECKOUT</button>
                            <div>
                                <p>{`₱ ${total_price}` || "₱ xxxx"}</p>
                                <h4>Subtotal:</h4>
                            </div>
                        </div>
                    </>
                    : <h1>no</h1>}
            </section>
        </>
    );
}
