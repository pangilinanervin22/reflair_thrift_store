import { getServerSession } from 'next-auth';
import prisma from '@/db/prisma';
import CheckOutButton from './CheckOutButton';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import IconLocation_svg from '@/assets/IconLocation_svg';
import style from './page.module.scss';
import { Playfair_Display } from 'next/font/google'
import { authOptions } from '@/db/options';
import { toast } from 'react-toastify';

const font = Playfair_Display({
    display: 'swap',
    weight: "400",
    subsets: ['latin'],
    variable: "--title_font",
});

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
            <section className={style.checkout_title}>
                <h2 className={font.className}>
                    Reflair | Checkout
                </h2>
            </section>
            <section className={style.checkout_content}>
                <div className={style.product_container}>
                    <div>
                        {account.cart?.product.map((product) => (
                            <div className={style.product} key={product.id}>
                                <div className={style.product_description}>
                                    <Image src={product.image} alt={product.name} width={300} height={300} />
                                    <div>
                                        {product.name}
                                        <p>{product.size}</p>
                                    </div>
                                </div>
                                <div className={style.product_price}>
                                    ₱{product.price}
                                </div>
                            </div>))
                        }
                    </div>
                </div>
                <div className={style.checkout_total}>
                    <div className={style.total}>
                        <p>{`Shipping Fee`}</p>
                        <p>₱{50}</p>
                    </div>
                    <div className={style.total}>
                        <p>{`Subtotal (${account.cart?.product.length} items)`}</p>
                        <p>₱{total}</p>
                    </div>
                    <div className={style.action}>
                        <div className={style.total}>
                            <p>{`TOTAL :`}</p>
                            <p>₱{total ? total + 50 : ""}</p>
                        </div>
                        <CheckOutButton account={account} product={account?.cart?.product.map(item => item.id)} >
                            <button className={style.checkout_button}>PLACE ORDER NOW</button>
                        </CheckOutButton>
                    </div>
                </div>
            </section>
            <section className={style.checkout_account}>
                <div className={style.delivery_description}>
                    <div className={style.delivery_title}>
                        <IconLocation_svg />
                        <h3>Delivery Address</h3>
                    </div>
                    <label htmlFor="name">Name</label>
                    <p>{account?.name}</p>
                    <label htmlFor="contact">Contact</label>
                    <p className={!account?.contact ? style.error : ''}>{account?.contact || 'Contact is required'}</p>
                    <label htmlFor="name">Address</label>
                    <p className={(!account?.barangay) ? style.error : ''}> {`(${account.city})`} {account?.barangay || 'Barangay is required'}</p>
                    <p className={(!account?.address) ? style.error : ''}>   {account?.address || 'Address is required'}</p>
                </div>
            </section>
        </main>
    )
}

// TODO: FIX DESIGN AND BUG