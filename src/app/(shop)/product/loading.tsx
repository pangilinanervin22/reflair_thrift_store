import ProductLoading from '@/components/ProductLoading'
import style from "./page.module.scss";

export default function loading() {
    return (
        <section className={style.product_section}>
            <header className={style.page_head}>
                <p className={style.eyebrow}>The Archive</p>
                <h1>All pieces</h1>
            </header>
            <ProductLoading />
        </section>
    )
}
