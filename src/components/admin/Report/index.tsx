import React from 'react'
import styles from './CardReport.module.scss'
import CardReport from './CardReport'
import SalesChart from './SalesChart'

export default function ReportPage() {
    return (
        <section className={styles.container}>
            {/* <div className={styles.alert_container}>
                <>
                    <h3>Stock Alert</h3>
                    <p>The
                        <span> {"KitKat Original"} </span>
                        only have
                        <span> {"2"} </span>
                        remaining stock</p>
                </>
            </div> */}
            <CardReport />
            <div className={styles.chart_container}>
                <div className={styles.bar}>
                    <h2 style={{ width: "100%" }}>Sales Last 6 months</h2>
                    <SalesChart />
                </div>

            </div>
        </section>
    )
}
