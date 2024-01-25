import ReportPage from "@/components/AdminComponent/Report";
import prisma from "@/db/prisma";

export default async function AdminDashboardPage() {
    const product = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    });

    return (
        <ReportPage ProductArray={product} />
    )
}
