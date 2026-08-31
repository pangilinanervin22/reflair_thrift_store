import IconMoney_svg from "@/assets/IconMoney_svg";
import styles from "./Report.module.scss"
import IconCart_svg from "@/assets/IconCart_svg";
import IconProfile_svg from "@/assets/IconProfile_svg";
import prisma from "@/db/prisma";
import { formatPeso } from "@/utils/formatPrice";

export default async function CardReport() {
    // Computed per request — module-scope dates would go stale on a warm
    // serverless instance and keep reporting last month.
    const now = new Date();
    const monthLabel = new Intl.DateTimeFormat("en-PH", { month: "long", timeZone: "Asia/Manila" }).format(now);
    const firstOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const firstOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

    const [total_product, total_account, totalSales] = await Promise.all([
        prisma.product.count({ where: { order: null } }),
        prisma.account.count(),
        prisma.order.aggregate({
            _sum: { total_price: true },
            where: {
                order_status: 'received',
                order_date: { gte: firstOfMonth, lt: firstOfNextMonth },
            },
        }),
    ]);

    return (
        <div className={styles.display_container}>
            <div className={styles.display_item}>
                <h3>
                    Sales — {monthLabel}
                </h3>
                <div>
                    <IconMoney_svg />
                    <h2>{formatPeso(totalSales._sum.total_price ?? 0)}</h2>
                </div>
            </div>
            <div className={styles.display_item}>
                <h3>
                    Pieces in the archive
                </h3>
                <div>
                    <IconCart_svg />
                    <h2>{total_product}</h2>
                </div>
            </div>
            <div className={styles.display_item}>
                <h3>
                    Accounts
                </h3>
                <div>
                    <IconProfile_svg />
                    <h2>{total_account}</h2>
                </div>
            </div>
        </div>
    )
}
