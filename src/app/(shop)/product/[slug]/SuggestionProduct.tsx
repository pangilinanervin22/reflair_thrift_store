import prisma from "@/db/prisma";
import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";
import { formatPeso } from "@/utils/formatPrice";

interface Props {
    category: string;
    exclude: string;
}

export default async function SuggestionProduct({ category, exclude }: Props) {
    const products = await prisma.product.findMany({
        where: {
            category: category,
            id: { not: exclude },
            order: null, // only pieces still in the archive
        },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            price: true,
            size: true,
            image: true,
        },
        take: 4,
    });

    return (
        <section className={style.suggestions_container}>
            {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <div className={style.suggestion_product}>
                        <div className={style.suggestion_frame}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={720}
                                height={900}
                                sizes="(max-width: 480px) 100vw, (max-width: 960px) 50vw, 25vw"
                            />
                        </div>
                        <div className={style.description}>
                            <p>{product.name}</p>
                            <p>Size {product.size}</p>
                            <p>{formatPeso(product.price)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    )
}
