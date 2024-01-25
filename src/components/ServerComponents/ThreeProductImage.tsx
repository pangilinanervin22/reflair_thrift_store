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


function shuffleArray(array: any[], getNumber = 3) {
    const newArray = [];
    for (let i = 0; i < getNumber; i++) {
        const random = Math.floor(Math.random() * array.length);
        newArray.push(array[random]);
    }

    return newArray;
}