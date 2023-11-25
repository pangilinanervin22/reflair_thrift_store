import IconMoney_svg from "@/assets/IconMoney_svg";
import styles from "./CardReport.module.scss"
import IconPerson_svg from "@/assets/IconPerson_svg";
import IconCart_svg from "@/assets/IconCart_svg";
import IconProfile_svg from "@/assets/IconProfile_svg";


const NOW_MONTH = new Date().toLocaleString('default', { month: 'long' });

export default function CardReport() {

    const report = {
        total_product: 32,
        sales: 3200,
        account: 12,
    }

    return (
        <div className={styles.display_container}>
            <div className={styles.display_item}>
                <h3>
                    Total Sales of {NOW_MONTH}
                </h3>
                <div>
                    <IconMoney_svg />
                    <h2>{report.sales}</h2>
                </div>
            </div>
            <div className={styles.display_item}>
                <h3>
                    Available Product
                </h3>
                <div>
                    <IconCart_svg />
                    <h2>{report.total_product}</h2>
                </div>
            </div>
            <div className={styles.display_item}>
                <h3>
                    Account
                </h3>
                <div>
                    <IconProfile_svg />
                    <h2>{report.account}</h2>
                </div>
            </div>
        </div>
    )
}
