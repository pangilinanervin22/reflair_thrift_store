
import React from 'react'
import SalesChart from './SalesChart'
import { Product } from '@prisma/client'
import dynamic from 'next/dynamic'
import RecentProduct from './RecentProduct'
import GraphExample from './GraphExample'
import RecentTableOrder from './RecentTableOrder'
import styles from './Report.module.scss'


interface ReportPageProps {
    ProductArray: Product[]
}

const CardReport = dynamic(() => import('./CardReport'), {
    loading: () => <div>Suggested Product is loading...</div>,
})


export default function ReportPage({ ProductArray }: ReportPageProps) {
    return (
        <section className={styles.container}>
            <CardReport />
            <div className={styles.chart_container}>
                <div className={styles.bar}>
                    <h2 style={{ width: "100%" }}>Total Sales:</h2>
                    <SalesChart />
                </div>
                <div className={styles.pie}>
                    <h2 style={{ width: "100%" }}>Trend Chart</h2>
                    <GraphExample product={ProductArray} />
                </div>
            </div>
            <div className={styles.other_container}>
                <div className={styles.order}>
                    <h3 style={{ width: "100%" }}>Recent Orders</h3>
                    <RecentTableOrder />
                </div>
                <RecentProduct FiveRecentProduct={ProductArray} />
            </div>
        </section>
    )
}
