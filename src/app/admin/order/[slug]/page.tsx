import prisma from "@/db/prisma";
import { redirect } from "next/navigation"
import style from "./page.module.scss";
import Image from "next/image";
import StatusSpan from "@/components/status/StatusSpan";
import EditOrder from "./EditOrder";

interface PageProps {
    params: {
        slug: string;
    };
}

function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
}

export default async function OrderSlugPage({ params }: PageProps) {

    let order;
    try {
        order = await prisma.order.findFirst({
            where: {
                id: params.slug,
            },
            include: {
                account: true,
                product: true
            }
        });
    } catch (error) {
        redirect("/admin/order");
    }


    if (!order || !order.account)
        redirect("/admin/order");

    const total = order.product.reduce((acc, product) => {
        return acc + product.price;
    }, 0);

    return (
        <section className={style.order_container}>
            <article className={style.order_title}>
                <div className={style.headline}>
                    <div className={style.title}>
                        <h3>
                            Order: {order.id.substring(0, 6)}
                        </h3>
                        <StatusSpan status={order.order_status} />
                    </div>
                    <h4>Payment method: {order.payment_mode === "cod" && "Cash on delivery"}</h4>
                    <h4>Order day: {formatDate(String((order.order_date)))}</h4>
                    <h4>Products count: {order.product.length}</h4>
                </div>
                <EditOrder propsOrder={order} />
            </article>
            <article className={style.order_content}>
                <div className={style.details}>
                    <h3>Customer Info</h3>
                    <div className={style.details_content}>
                        <label>Name</label>
                        <h4>{order.account.name}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Email</label>
                        <h4>{order.account.email}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Contact</label>
                        <h4>{order.account.contact}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Barangay</label>
                        <p className={(!order?.barangay) ? style.error : ''}>
                            {`(${order.city}) `}
                            {order?.barangay || 'Barangay is required'}
                        </p>
                    </div>
                    <div className={style.details_content}>
                        <label>Address</label>
                        <h4>{order.account.address}</h4>
                    </div>
                </div>
                <div className={style.products}>
                    <h3>Products</h3>
                    {order.product.map((product) => (
                        <div key={product.id} className={style.product}>
                            <Image src={product.image} alt={product.name} width={100} height={100} />
                            <div className={style.product_details}>
                                <div className={style.product_name}>
                                    <h4>{product.name}</h4>
                                    <h5>{product.size}</h5>
                                </div>
                                <h4>₱{product.price}</h4>
                            </div>
                        </div>
                    ))}
                    <div className={style.subtotal}>
                        <h3>Shipping Fee</h3>
                        <h3>₱50</h3>
                    </div>
                    <div className={style.subtotal}>
                        <h3>Subtotal</h3>
                        <h3>₱{total}</h3>
                    </div>
                    <div className={style.product_total}>
                        <h3>Total:</h3>
                        <h3>₱{total + 50}</h3>
                    </div>
                </div>
            </article>
        </section>
    );
}
