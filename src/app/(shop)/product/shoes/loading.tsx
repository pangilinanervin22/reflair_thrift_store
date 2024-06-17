import React from 'react'
import ProductLoading from '@/components/ProductLoading'
import style from "./page.module.scss";

export default function loading() {
    return (
        <div>
            <section className={style.product_section}>
                <br />
                <h3>{"Shoes Collection"}</h3>
                <br />
                <ProductLoading />x
            </section>
        </div>
    )
}
