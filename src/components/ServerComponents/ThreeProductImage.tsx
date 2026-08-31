import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";
import style from "./ThreeProductImage.module.scss";
import { formatPeso } from "@/utils/formatPrice";

// The three newest pieces still in the archive. One bounded query instead of
// loading every product id and shuffling — on a `revalidate = false` page a
// random pick would be frozen at generation time anyway.
export default async function ThreeProductImage() {
    const products = await prisma.product.findMany({
        where: { order: null },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
        },
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
                            <span className={style.price}>{formatPeso(item.price)}</span>
                        </figcaption>
                    </figure>
                </Link>
            ))}
        </div>
    )
}
