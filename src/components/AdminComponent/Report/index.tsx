
import React from 'react'
import styles from './CardReport.module.scss'
import CardReport from './CardReport'
import SalesChart from './SalesChart'
import { Product } from '@prisma/client'
import Image from 'next/image'

interface ReportPageProps {
    ProductArray: Product[]
}

export default function ReportPage({ ProductArray }: ReportPageProps) {
    return (
        <section className={styles.container}>
            <CardReport />
            <div className={styles.chart_container}>
                <div className={styles.bar}>
                    <h2 style={{ width: "100%" }}>Total Sales:</h2>
                    <SalesChart />
                </div>
                <div className={styles.trend}>
                    <h2>Latest Product</h2>
                    <div className={styles.container_product}>
                        {ProductArray.map((cur) => (
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
            </div>
        </section>
    )
}
