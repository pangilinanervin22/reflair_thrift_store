'use server'

import prisma from "@/db/prisma";
import Image from "next/image";

export default async function ThreeProductImage() {
    const allProducts = await prisma.product.findMany({
        select: {
            id: true
        }
    });

    // Select the first 3 IDs
    const randomProductIds = shuffleArray(allProducts).map(product => product.id);

    // Fetch the products with the random IDs
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: randomProductIds
            }
        }
    });

    return (
        <>
            {products.map((item) => (
                <Image
                    key={item.id}
                    src={item.image}
                    alt="Sec2-Jacket3"
                    width={1920}
                    height={1080}
                />
            ))}
        </>
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