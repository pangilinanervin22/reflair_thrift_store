"use client"

import style from "./page.module.scss";
import Image from "next/image";
import { useCartStore } from "./cart";

export default function CartPage() {
    const { product, removeProduct } = useCartStore()
    // const total_price = product.reduce(( i , m) => {})
    const total_price = product.reduce((total, item) => total + item.price, 0);

    return (
        <>
            <section className={style.flex_section}>
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
                            <p>₱ {item.price}</p>
                            {/* <button className={style.cart} onClick={() => addProduct(item)}>ADD TO CART</button> */}
                            <button className={style.remove} onClick={() => removeProduct(item)}>REMOVE</button>
                        </div>
                    </div>
                ))
                }
                {/* <div className={style.ImageWrapper}>
                        <Image
                            src="/"
                            width={400}
                            height={400}
                            quality={100}
                            alt="liked pic"
                        />
                        <section className={style.description}>
                            <h3>Name</h3>
                            <h1>Size: </h1>
                            <h1>₱ </h1>
                        </section>
                        <section className={style.button}>
                            <button className={style.cart}>ADD TO CART</button>
                            <button className={style.remove}>REMOVE</button>
                        </section>
                    </div> */}
                <div className={style.checkout}>
                    <button>CHECKOUT</button>
                    <div>
                        <p>{`₱ ${total_price}` || "₱ xxxx"}</p>
                        <h4>Subtotal:</h4>
                    </div>
                </div>
            </section>
        </>
    );
}
