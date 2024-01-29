import prisma from "@/db/prisma";
import { redirect } from "next/navigation"
import style from "./page.module.scss";
import Image from "next/image";
import { formatDateString } from "@/utils/formatDate";
import StatusSpan from "@/components/status/StatusSpan";
import Link from "next/link";

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function CustomerpAGE({ params }: PageProps) {

    let customer;
    try {
        customer = await prisma.account.findFirst({
            where: {
                id: params.slug,
                role: "customer"
            },
            include: {
                order: true
            }
        });
    } catch (error) {
        redirect("/admin/order");
    }


    if (!customer)
        redirect("/admin/order");

    const total = customer.order.reduce((acc, product) => {
        return acc + product.total_price;
    }, 0);

    return (
        <section className={style.customer_container}>
            <header>
                <Link href={"/admin/customer"}>
                    <button className={style.back_button}><span>&#8249;</span> back to table</button>
                </Link>
                <div>
                    <h5>Customer Details</h5>
                    <p>Customer id: {customer.id}</p>
                </div>
            </header>
            <article className={style.customer_info}>
                <div className={style.details}>
                    <h3>Customer Info</h3>
                    <div className={style.details_content}>
                        <label>Name</label>
                        <h4>{customer.name}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Email</label>
                        <h4>{customer.email}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Contact</label>
                        <h4>{customer.contact}</h4>
                    </div>
                    <div className={style.details_content}>
                        <label>Barangay</label>
                        <p className={(!customer?.barangay) ? style.error : ''}>
                            {`(${customer.city}) `}
                            {customer?.barangay || 'Barangay is required'}
                        </p>
                    </div>
                    <div className={style.details_content}>
                        <label>Address</label>
                        <h4>{customer.address}</h4>
                    </div>
                </div>
                <div className={style.orders}>
                    <h3>Orders Count : {customer.order.length}</h3>
                    <div className={style.order_label}>
                        <label>Order Date</label>
                        <label>Total Price</label>
                        <label>Status</label>
                        <label></label>
                    </div>
                    {customer.order.map((order) => (
                        <div key={order.id} className={style.order}>
                            <h4>{formatDateString(order.order_date)}</h4>
                            <div><p>{order.total_price}</p></div>
                            <StatusSpan status={order.order_status} />
                            <Link href={`/admin/order/${order.id}`}>
                                <button>view</button>
                            </Link>
                        </div>
                    ))}
                    <div className={style.product_total}>
                        <h3>Total Order:</h3>
                        <h3>₱{total}</h3>
                    </div>
                </div>
            </article>
        </section>
    );
}
