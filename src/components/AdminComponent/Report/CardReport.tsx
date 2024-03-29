import IconMoney_svg from "@/assets/IconMoney_svg";
import styles from "./Report.module.scss"
import IconCart_svg from "@/assets/IconCart_svg";
import IconProfile_svg from "@/assets/IconProfile_svg";
import prisma from "@/db/prisma";

const NOW = new Date();
const NOW_MONTH = NOW.toLocaleString('default', { month: 'long' });
const FIRST_DAY_MONTH = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
const FIRST_DAY_NEXT_MONTH = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 1);

export default async function CardReport() {
    const productsWithoutOrders = await prisma.product.findMany({
        where: {
            order: null
        }
    });
    const total_product = productsWithoutOrders.length || 0;
    const total_account = prisma.account.count() || 2;
    const totalSales = await prisma.order.aggregate({
        _sum: {
            total_price: true
        },
        where: {
            order_status: 'received',
            order_date: {
                gte: FIRST_DAY_MONTH,
                lt: FIRST_DAY_NEXT_MONTH
            }
        }
    });


    const report = {
        sales: totalSales._sum.total_price,
        total_product: total_product,
        account: total_account,
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
