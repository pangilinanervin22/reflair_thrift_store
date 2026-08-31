import { Suspense } from 'react'
import SalesChart from './SalesChart'
import RecentProduct, { type RecentProductItem } from './RecentProduct'
import GraphExample from './GraphExample'
import RecentTableOrder from './RecentTableOrder'
import CardReport from './CardReport'
import styles from './Report.module.scss'
import type { SalesData } from '@/app/admin/page'
import type { ProductCategory } from '@/lib/constants'

export type CategoryCounts = Record<ProductCategory, number>;

interface ReportPageProps {
    latestProducts: RecentProductItem[];
    categoryCounts: CategoryCounts;
    salesData: SalesData[];
}

export default function ReportPage({ latestProducts, categoryCounts, salesData }: ReportPageProps) {
    return (
        <section className={styles.report}>
            <header className={styles.report_head}>
                <p>ReFlair Atelier · Overview</p>
                <h2>Store performance</h2>
            </header>
            {/* CardReport is an async server component — a Suspense boundary streams it in */}
            <Suspense fallback={<div className={styles.display_container}>Loading figures…</div>}>
                <CardReport />
            </Suspense>
            <div className={styles.chart_container}>

                <div className={styles.bar}>
                    <h3>Sales by month</h3>
                    <SalesChart dataProps={salesData} />
                </div>
                <div className={styles.pie}>
                    <h3>Sold pieces by category</h3>
                    <GraphExample counts={categoryCounts} />
                </div>
            </div>
            <div className={styles.other_container}>
                <div className={styles.order}>
                    <h3>Recent orders</h3>
                    <RecentTableOrder />
                </div>
                <RecentProduct products={latestProducts} />
            </div>
        </section>
    )
}
