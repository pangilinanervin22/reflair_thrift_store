import prisma from "@/db/prisma";
import ProductUpdatePage from "@/components/Forms/ProductForm/ProductForm";
import { redirect } from "next/navigation"
import formatDate from "@/utils/formatDate";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps) {
    return {
        title: "Product: " + params.slug,
        description: "Product: " + params.slug,
    };
}

export default async function OrderSlugPage({ params }: PageProps) {
    const order = await prisma.order.findFirst({
        where: {
            id: params.slug,
        },
        include: {
            account: true,
            product: true
        }
    });

    if (!order) {
        alert("Order not found!");
        redirect("/admin/order");
    }

    console.log(order);

    return (
        // <ProductUpdatePage product={product} />
        <>
            <h2>Edit Order</h2>
            <div>
                <h3>{order.account.name}</h3>
                <h3>{order.order_status}</h3>
                <h3>{order.total_price}</h3>
                <h3>{formatDate(order.order_date)}</h3>
            </div>
        </>
    );
}
