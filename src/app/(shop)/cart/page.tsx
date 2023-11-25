"use client"

import style from "./page.module.scss";
import Image from "next/image";
import { useCartStore } from "./cart";

export default function LikePage() {
    const { product, addProduct, removeProduct } = useCartStore()
    return (
        <>
            <section className={style.flex_section}>
                <h1>Product in Cart: {product.length}</h1>

                <div className={style.product_container}>
                    {product.map((item) => (
                        <div className={style.ImageWrapper} key={item.id}>
                            <Image
                                src={item.image}
                                width={400}
                                height={400}
                                quality={100}
                                alt="liked pic"
                            />
                            <section className={style.description}>
                                <h3>{item.name}</h3>
                                <h1>Size: {item.size}</h1>
                                <h1>₱ {item.price}</h1>
                            </section>
                            <section className={style.button}>
                                {/* <button className={style.cart} onClick={() => addProduct(item)}>ADD TO CART</button> */}
                                <button className={style.remove} onClick={() => removeProduct(item)}>REMOVE</button>
                            </section>
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
                </div>
            </section>
        </>
    );
}
