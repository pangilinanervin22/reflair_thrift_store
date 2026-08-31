import style from "./page.module.scss";

export default function loading() {
    return (
        <article className={style.product_wrapper}>
            <section className={style.product_container}>
                <div className={style.loading_image}></div>
                <section className={style.loading_content}>
                    <h3></h3>
                    <h2></h2>
                    <span className={style.loading_text_price}></span>
                    <div className={style.loading_button}></div>
                    <div className={style.loading_button}></div>
                </section>
            </section>
            <section className={style.suggestion}>
                <header className={style.suggestion_head}>
                    <h3>You might also like</h3>
                </header>
                <div className={style.loading_suggestions_container}>
                    {productCardLoadingGenerator(4)}
                </div>
            </section>
        </article>
    );
}


const productCardLoadingGenerator = (count: number) => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <div key={index} className={style.card_loading}>
                    <div className={style.loading_image}></div>
                    <div className={style.loading_text}></div>
                </div>
            ))}
        </>
    )
}
