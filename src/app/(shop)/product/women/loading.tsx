import React from 'react';
import style from './page.module.scss';

export default function loading() {
    const count = 8;

    return (
        <section className={style.product_section}>
            <br />
            <h3>{"Women's Clothing"}</h3>
            <br />
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
