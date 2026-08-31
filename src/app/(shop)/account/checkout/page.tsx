import prisma from '@/db/prisma';
import CheckOutButton from './CheckOutButton';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import style from './page.module.scss';
import { getSessionUser } from '@/lib/auth';
import { SHIPPING_FEE } from '@/lib/constants';
import { formatPeso } from "@/utils/formatPrice";

export default async function CheckoutPage() {
    const user = await getSessionUser();
    if (!user) redirect("/login?callbackUrl=%2Faccount%2Fcheckout");

    const account = await prisma.account.findUnique({
        where: { id: user.id },
        // Only what this page shows — never the password hash
        select: {
            name: true, contact: true, city: true, barangay: true, address: true,
            cart: { select: { product: true } },
        },
    });
    if (!account) redirect("/login");

    const items = account.cart?.product ?? [];
    if (items.length === 0) redirect("/account/cart");

    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const missing = [
        !account.contact && "contact number",
        !account.barangay && "barangay",
        !account.address && "street address",
    ].filter((value): value is string => Boolean(value));
    const canCheckout = missing.length === 0;

    return (
        <main className={style.checkout_container}>
            <header className={style.checkout_title}>
                <p className={style.eyebrow}>ReFlair · Final step</p>
                <h1>Checkout</h1>
            </header>

            <div className={style.checkout_grid}>
                <section className={style.checkout_content}>
                    <p className={style.panel_label}>
                        Your pieces ({items.length})
                    </p>
                    <div className={style.product_container}>
                        {items.map((product) => (
                            <div className={style.product} key={product.id}>
                                <div className={style.product_description}>
                                    <Image src={product.image} alt={product.name} width={144} height={180} sizes="72px" />
                                    <div>
                                        <p className={style.product_name}>{product.name}</p>
                                        <p className={style.product_size}>Size {product.size}</p>
                                    </div>
                                </div>
                                <div className={style.product_price}>
                                    {formatPeso(product.price)}
                                </div>
                            </div>))
                        }
                    </div>
                </section>

                <aside className={style.checkout_side}>
                    <section className={style.checkout_account}>
                        <p className={style.panel_label}>Delivery address</p>
                        <dl className={style.delivery_description}>
                            <dt>Name</dt>
                            <dd>{account.name}</dd>
                            <dt>Contact</dt>
                            <dd className={!account.contact ? style.error : ''}>{account.contact || 'Contact is required'}</dd>
                            <dt>Address</dt>
                            <dd className={!account.barangay ? style.error : ''}>{"(" + account.city + ") "}{account.barangay || 'Barangay is required'}</dd>
                            <dd className={!account.address ? style.error : ''}>{account.address || 'Address is required'}</dd>
                        </dl>
                        {!canCheckout && (
                            <p className={style.notice}>
                                Add your {missing.join(", ")} before placing an order.{" "}
                                <Link href="/account">Complete your delivery details</Link>
                            </p>
                        )}
                    </section>

                    <section className={style.checkout_total}>
                        <div className={style.total}>
                            <p>Shipping fee</p>
                            <p>{formatPeso(SHIPPING_FEE)}</p>
                        </div>
                        <div className={style.total}>
                            <p>{"Subtotal (" + items.length + (items.length === 1 ? " item)" : " items)")}</p>
                            <p>{formatPeso(subtotal)}</p>
                        </div>
                        <div className={style.grand_total}>
                            <p>Total</p>
                            <p>{formatPeso(subtotal + SHIPPING_FEE)}</p>
                        </div>
                        <CheckOutButton className={style.checkout_button} disabled={!canCheckout}>
                            Place order now
                        </CheckOutButton>
                    </section>
                </aside>
            </div>
        </main>
    )
}
