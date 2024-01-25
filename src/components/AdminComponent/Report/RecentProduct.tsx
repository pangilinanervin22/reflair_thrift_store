'use client'

import { Product } from "@prisma/client"
import Image from "next/image"
import styles from './Report.module.scss'


interface ReportPageProps {
    FiveRecentProduct: Product[]
}

export default function RecentProduct({ FiveRecentProduct }: ReportPageProps) {
    let current = FiveRecentProduct.filter((item) => item.order_id == null);
    current = current.slice(0, 5);

    console.log(current);

    return (
        <div className={styles.trend}>
            <h2>Latest Product</h2>
            <div className={styles.container_product}>
                {current.map((cur) => (
                    <div key={cur.id} className={styles.product}>
                        <Image src={cur.image} alt={cur.name} width={100} height={100} />
                        <div>
                            <p>{cur.name}</p>
                            <p>{cur.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
