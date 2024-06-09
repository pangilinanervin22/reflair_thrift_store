
import React from 'react';
import style from './ProductLoading.module.scss';

export default function ProductLoading() {
    const numCards = 8;

    return (
        <div className={style.product_loading_container}>
            {Array.from({ length: numCards }, (_, index) => (
                <ProductCard key={index} />
            ))}
        </div>
    );
}

function ProductCard() {
    return (
        <div className={style.product_loading_card}>
            <div className={style.product_loading_image}></div>
            <div className={style.product_loading_content}>
                <div className={style.product_loading_text_name}></div>
                <div className={style.product_loading_text_price}></div>
                <div className={style.product_loading_button}>
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    );
}