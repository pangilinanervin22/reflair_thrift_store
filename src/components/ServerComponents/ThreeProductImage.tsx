'use server'

import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";
import style from "./ThreeProductImage.module.scss";

export default async function ThreeProductImage() {
    const allProducts = await prisma.product.findMany({
        select: {
            id: true
        }
    });

    // Select the first 3 IDs
    const randomProductIds = shuffleArray(allProducts).map(product => product.id);

    // Fetch only the fields the cards render
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: randomProductIds
            }
        },
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
        }
    });

    return (
        <div className={style.row}>
            {products.map((item, i) => (
                <Link href={`/product/${item.id}`} key={item.id} className={style.card}>
                    <figure>
                        <div className={style.frame}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={760}
                                height={950}
                                sizes="(max-width: 720px) 100vw, 33vw"
                            />
                        </div>
                        <figcaption>
                            <span className={style.index}>
                                Nº {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={style.name}>{item.name}</span>
                            <span className={style.price}>₱ {item.price}</span>
                        </figcaption>
                    </figure>
                </Link>
            ))}
        </div>
    )
}


function shuffleArray<T>(array: T[], getNumber = 3): T[] {
    const newArray = [...array];
    // Fisher–Yates shuffle
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray.slice(0, getNumber);
}
