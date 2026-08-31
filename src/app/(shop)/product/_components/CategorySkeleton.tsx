import style from "./CategoryPage.module.scss";

export default function CategorySkeleton({ title, count = 8 }: { title: string; count?: number }) {
    return (
        <section className={style.product_section}>
            <header className={style.page_head}>
                <p className={style.eyebrow}>The Archive</p>
                <h1>{title}</h1>
            </header>
            <div className={style.product_container}>
                {Array.from({ length: count }).map((_, i) => (
                    <div className={style.product_card} key={i}>
                        <div className={[style.loading_image, style.skeleton].join(' ')} />
                        <section className={style.description}>
                            <div className={[style.loading_text_name, style.skeleton].join(' ')} />
                            <div className={[style.loading_text_small, style.skeleton].join(' ')} />
                            <div className={[style.loading_text_small, style.skeleton].join(' ')} />
                        </section>
                        <section className={style.button_container}>
                            <div className={[style.loading_button, style.skeleton].join(' ')} />
                            <div className={[style.loading_button, style.skeleton].join(' ')} />
                        </section>
                    </div>
                ))}
            </div>
        </section>
    );
}
