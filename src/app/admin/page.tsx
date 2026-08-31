import ReportPage, { type CategoryCounts } from "@/components/AdminComponent/Report";
import prisma from "@/db/prisma";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/constants";

export interface SalesData {
    month: string;
    year: string;
    total_sales: number;
}

const isCategory = (value: string): value is ProductCategory =>
    (PRODUCT_CATEGORIES as readonly string[]).includes(value);

export default async function AdminDashboardPage() {
    const [latestProducts, soldPieces, salesData] = await Promise.all([
        prisma.product.findMany({
            where: { order: null },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, name: true, price: true, image: true },
        }),
        // Pieces on live (non-cancelled) orders — cancelled orders release theirs
        prisma.product.findMany({
            where: { order: { is: { order_status: { not: "cancelled" } } } },
            select: { category: true },
        }),
        getSalesData(),
    ]);

    const categoryCounts: CategoryCounts = { men: 0, women: 0, shoes: 0 };
    for (const { category } of soldPieces) {
        if (isCategory(category)) categoryCounts[category] += 1;
    }

    return (
        <ReportPage latestProducts={latestProducts} categoryCounts={categoryCounts} salesData={salesData} />
    )
}

// Received orders bucketed by calendar month (Philippine time), oldest → newest,
// for the last twelve months.
async function getSalesData(): Promise<SalesData[]> {
    const since = new Date();
    since.setUTCMonth(since.getUTCMonth() - 11, 1);
    since.setUTCHours(0, 0, 0, 0);

    const orders = await prisma.order.findMany({
        where: { order_status: "received", order_date: { gte: since } },
        select: { total_price: true, order_date: true },
    });

    const monthKey = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", timeZone: "Asia/Manila" }); // 2026-08
    const monthName = new Intl.DateTimeFormat("en-PH", { month: "long", timeZone: "Asia/Manila" });

    const buckets = new Map<string, SalesData>();
    for (const order of orders) {
        const key = monthKey.format(order.order_date);
        const bucket = buckets.get(key) ?? { month: monthName.format(order.order_date), year: key.slice(0, 4), total_sales: 0 };
        bucket.total_sales += order.total_price;
        buckets.set(key, bucket);
    }

    return [...buckets.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, bucket]) => bucket);
}
