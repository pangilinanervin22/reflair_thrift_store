"use client"

import style from "./page.module.scss";
import { useCartStore } from "./cart";

export default function ShopMainPage() {
    const { product } = useCartStore();
    console.log(product, "hello");

    return (
        <>
            <section className={style.flex_section}>
                <h1>Total Item: </h1>
                {product.map((item) => (<div key={item.id}>{item.name}</div>))}

            </section>
        </>
    );
}
