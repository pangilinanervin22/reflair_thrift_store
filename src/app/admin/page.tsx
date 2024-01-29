import ReportPage from "@/components/AdminComponent/Report";
import prisma from "@/db/prisma";

export default async function AdminDashboardPage() {
    const product = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    });

    const order = await getSalesData();

    return (
        <ReportPage ProductArray={product} OrderData={order} />
    )
}

export interface SalesData {
    month: string;
    year: string;
    total_sales: number;
}

async function getSalesData(): Promise<SalesData[]> {
    const orders = await prisma.order.findMany({
        where: {
            order_status: 'received',
        },
        select: {
            total_price: true,
            order_date: true,
        },
    });

    const salesData: SalesData[] = orders.reduce((acc: SalesData[], order) => {
        const date = new Date(order.order_date);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString();

        const existingData = acc.find(data => data.month === month && data.year === year);

        if (existingData) {
            existingData.total_sales += order.total_price;
        } else {
            acc.push({ month, year, total_sales: order.total_price });
        }

        return acc;
    }, []);

    return salesData;
}