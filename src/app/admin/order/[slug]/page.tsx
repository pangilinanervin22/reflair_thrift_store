import prisma from "@/db/prisma";
import { redirect } from "next/navigation"
import style from "./page.module.scss";
import Image from "next/image";
import StatusSpan from "@/components/status/StatusSpan";
import EditOrder from "./EditOrder";
import { SHIPPING_FEE } from "@/lib/constants";
import { ObjectIdSchema } from "@/lib/schemas/common";
import { formatDateTime } from "@/utils/formatDate";
import { formatPeso } from "@/utils/formatPrice";
import { parseOrderItems } from "@/lib/orderItems";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

const PAYMENT_LABEL: Record<string, string> = {
    cod: "Cash on delivery",
    gcash: "GCash",
    paymaya: "Maya",
    paypal: "PayPal",
};

export default async function OrderSlugPage({ params }: PageProps) {
    const { slug } = await params;
    if (!ObjectIdSchema.safeParse(slug).success) redirect("/admin/order");

    const order = await prisma.order.findUnique({
        where: { id: slug },
        include: {
            // Only what this page shows — never the password hash
            account: { select: { name: true, email: true, contact: true, address: true } },
            product: true,
        },
    });
    if (!order) redirect("/admin/order");

    // Older orders predate the stored fee; released/deleted pieces fall back to the checkout snapshot.
    const shippingFee = order.shipping_fee ?? SHIPPING_FEE;
    const snapshot = parseOrderItems(order.items);
    const lines = order.product.length > 0
        ? order.product.map((product) => ({ id: product.id, name: product.name, size: product.size, price: product.price, image: product.image as string | undefined }))
        : snapshot.map((item) => ({ id: item.id, name: item.name, size: item.size ?? "", price: item.price, image: undefined }));
    const subtotal = lines.length > 0
        ? lines.reduce((acc, line) => acc + line.price, 0)
        : order.total_price - shippingFee;
    const contact = order.contact ?? order.account?.contact ?? "—";

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
                    <h4>Payment method: {PAYMENT_LABEL[order.payment_mode] ?? order.payment_mode}</h4>
                    <h4>Order day: {formatDateTime(order.order_date)}</h4>
                    <h4>Products count: {lines.length}</h4>
                    {order.order_status === "cancelled" && order.cancel_reason && (
                        <h4>Cancelled: {order.cancel_reason}</h4>
                    )}
                </div>
                <EditOrder propsOrder={order} />
            </article>
            <article className={style.order_content}>
                <div className={style.details}>
                    <h3>Customer Info</h3>
                    {order.account ? (
                        <>
                            <div className={style.details_content}>
                                <label>Name</label>
                                <h4>{order.account.name}</h4>
                            </div>
                            <div className={style.details_content}>
                                <label>Email</label>
                                <h4>{order.account.email}</h4>
                            </div>
                        </>
                    ) : (
                        <div className={style.details_content}>
                            <label>Name</label>
                            <h4>{order.name}</h4>
                            <p className={style.error}>Customer account deleted</p>
                        </div>
                    )}
                    <div className={style.details_content}>
                        <label>Contact</label>
                        <h4>{contact}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Barangay</label>
                        <p className={(!order.barangay) ? style.error : ''}>
                            {"(" + order.city + ") "}
                            {order.barangay || 'Barangay is required'}
                        </p>
                    </div>
                    <div className={style.details_content}>
                        <label>Address</label>
                        <h4>{order.address}</h4>
                    </div>
                </div>
                <div className={style.products}>
                    <h3>Products</h3>
                    {order.product.length === 0 && (
                        <p>
                            {order.order_status === "cancelled"
                                ? "The pieces returned to the archive when this order was cancelled" + (snapshot.length ? " — listed as ordered:" : ".")
                                : snapshot.length ? "Pieces as ordered:" : "No pieces on this order."}
                        </p>
                    )}
                    {lines.map((line) => (
                        <div key={line.id} className={style.product}>
                            {line.image && <Image src={line.image} alt={line.name} width={100} height={100} sizes="100px" />}
                            <div className={style.product_details}>
                                <div className={style.product_name}>
                                    <h4>{line.name}</h4>
                                    <h5>{line.size}</h5>
                                </div>
                                <h4>{formatPeso(line.price)}</h4>
                            </div>
                        </div>
                    ))}
                    <div className={style.subtotal}>
                        <h3>Shipping Fee</h3>
                        <h3>{formatPeso(shippingFee)}</h3>
                    </div>
                    <div className={style.subtotal}>
                        <h3>Subtotal</h3>
                        <h3>{formatPeso(subtotal)}</h3>
                    </div>
                    <div className={style.product_total}>
                        <h3>Total:</h3>
                        <h3>{formatPeso(order.total_price)}</h3>
                    </div>
                </div>
            </article>
        </section>
    );
}
