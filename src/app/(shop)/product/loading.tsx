import React from 'react'
import ProductLoading from '@/components/ProductLoading'
import style from "./page.module.scss";

export default function loading() {
    return (
        <section className={style.product_section}>
            <header className={style.page_head}>
                <p className={style.eyebrow}>The Archive</p>
                <h2>All pieces</h2>
            </header>
            <ProductLoading />
        </section>
    )
}
