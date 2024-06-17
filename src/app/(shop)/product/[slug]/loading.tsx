import React from 'react'

import prisma from "@/db/prisma";
import Image from "next/image";
import style from "./page.module.scss";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";
import { authOptions } from "@/db/options";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'
const SuggestionProduct = dynamic(() => import('./SuggestionProduct'), {
    loading: () => <p>Suggested Product is loading...</p>,
})


interface PageProps {
    params: {
        slug: string;
    };
}


export default async function loading() {


    return (
        <article className={style.product_wrapper}>
            <section className={style.product_container}>
                <div className={style.loading_image}></div>
                <section className={style.loading_content}>
                    <h2></h2>
                    <h3></h3>
                    <section className={style.loading_content}>
                        <div className={style.loading_button}></div>
                        <div className={style.loading_button}></div>
                    </section>
                    <span className={style.loading_text_price}>

                    </span>
                    <ul>
                        <li> </li>
                        <li> </li>
                    </ul>
                </section>
            </section>
            <section className={style.suggestion}>
                <h3>You might also like</h3>
                <div className={style.loading_suggestions_container}>
                    {productCardLoadingGenerator(8)}
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