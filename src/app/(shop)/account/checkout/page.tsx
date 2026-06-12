import { getServerSession } from 'next-auth';
import prisma from '@/db/prisma';
import CheckOutButton from './CheckOutButton';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import style from './page.module.scss';
import { authOptions } from '@/db/options';

export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const account = await prisma.account.findUnique({
        where: {
            email: session?.user.email,
        },
        include: {
            cart: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!account) redirect("/login");
    if (account?.cart?.product.length === 0) {
        redirect("/account/cart")
    };

    const total = account?.cart?.product.reduce((acc, item) => acc + item.price, 0);

    return (
        <main className={style.checkout_container}>
            <header className={style.checkout_title}>
                <p className={style.eyebrow}>ReFlair · Final step</p>
                <h2>Checkout</h2>
            </header>

            <div className={style.checkout_grid}>
                <section className={style.checkout_content}>
                    <p className={style.panel_label}>
                        Your pieces ({account.cart?.product.length})
                    </p>
                    <div className={style.product_container}>
                        {account.cart?.product.map((product) => (
                            <div className={style.product} key={product.id}>
                                <div className={style.product_description}>
                                    <Image src={product.image} alt={product.name} width={144} height={180} sizes="72px" />
                                    <div>
                                        <p className={style.product_name}>{product.name}</p>
                                        <p className={style.product_size}>Size {product.size}</p>
                                    </div>
                                </div>
                                <div className={style.product_price}>
                                    ₱ {product.price}
                                </div>
                            </div>))
                        }
                    </div>
                </section>

                <aside className={style.checkout_side}>
                    <section className={style.checkout_account}>
                        <p className={style.panel_label}>Delivery address</p>
                        <div className={style.delivery_description}>
                            <label htmlFor="name">Name</label>
                            <p>{account?.name}</p>
                            <label htmlFor="contact">Contact</label>
                            <p className={!account?.contact ? style.error : ''}>{account?.contact || 'Contact is required'}</p>
                            <label htmlFor="address">Address</label>
                            <p className={(!account?.barangay) ? style.error : ''}> {`(${account.city})`} {account?.barangay || 'Barangay is required'}</p>
                            <p className={(!account?.address) ? style.error : ''}>{account?.address || 'Address is required'}</p>
                        </div>
                    </section>

                    <section className={style.checkout_total}>
                        <div className={style.total}>
                            <p>Shipping fee</p>
                            <p>₱ {50}</p>
                        </div>
                        <div className={style.total}>
                            <p>{`Subtotal (${account.cart?.product.length} items)`}</p>
                            <p>₱ {total}</p>
                        </div>
                        <div className={style.grand_total}>
                            <p>Total</p>
                            <p>₱ {total ? total + 50 : ""}</p>
                        </div>
                        <CheckOutButton account={account} product={account?.cart?.product.map(item => item.id)} >
                            <button className={style.checkout_button}>Place order now</button>
                        </CheckOutButton>
                    </section>
                </aside>
            </div>
        </main>
    )
}
