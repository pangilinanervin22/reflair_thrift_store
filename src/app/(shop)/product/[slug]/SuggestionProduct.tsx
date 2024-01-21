'use server'

import prisma from "@/db/prisma";
import Image from "next/image";
import style from "./page.module.scss";
import wait from "@/utils/wait";
import Link from "next/link";

interface Props {
    category: string;
    exclude: string;
}

export default async function SuggestionProduct({ category, exclude }: Props) {
    let products = await prisma.product.findMany({
        where: {
            category: category,
        },
        take: 9,
    });

    products = products.filter((product) => product.id !== exclude);

    return (
        <section className={style.suggestions_container}>
            {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <div className={style.suggestion_product} key={product.id}>
                        <Image src={product.image} alt="Picture of the product" width={720} height={720} />
                        <div className={style.description}>
                            <p>{product.name}</p>
                            <p>{product.size}</p>
                            <p>₱{product.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    )
}
