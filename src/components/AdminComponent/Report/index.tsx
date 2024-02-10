
import React from 'react'
import SalesChart from './SalesChart'
import { Product } from '@prisma/client'
import dynamic from 'next/dynamic'
import RecentProduct from './RecentProduct'
import GraphExample from './GraphExample'
import RecentTableOrder from './RecentTableOrder'
import styles from './Report.module.scss'
import { SalesData } from '@/app/admin/page'

interface ReportPageProps {
    ProductArray: Product[]
    OrderData: SalesData[]
}

const CardReport = dynamic(() => import('./CardReport'), {
    loading: () => <div>Suggested Product is loading...</div>,
})


export default function ReportPage({ ProductArray, OrderData }: ReportPageProps) {
    return (
        <section className={styles.report}>
            <CardReport />
            <div className={styles.chart_container}>

                <div className={styles.bar}>
                    <h3>Sales Chart:</h3>
                    <SalesChart dataProps={OrderData} />
                </div>
                <div className={styles.pie}>
                    <h3>Trend Chart</h3>
                    <GraphExample product={ProductArray} />
                </div>
            </div>
            <div className={styles.other_container}>
                <div className={styles.order}>
                    <h3>Recent Orders</h3>
                    <RecentTableOrder />
                </div>
                <RecentProduct FiveRecentProduct={ProductArray} />
            </div>
        </section>
    )
}