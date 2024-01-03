import { getServerSession } from 'next-auth';
import prisma from '@/db/prisma';
import CheckOutButton from './CheckOutButton';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import IconLocation_svg from '@/assets/IconLocation_svg';
import style from './page.module.scss';
import { Playfair_Display } from 'next/font/google'
import { authOptions } from '@/db/options';

const font = Playfair_Display({
    display: 'swap',
    weight: "400",
    subsets: ['latin'],
    variable: "--title_font",
});

export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);
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
    if (account?.cart?.product.length === 0) redirect("/cart");

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
                    <h4>Products Ordered</h4>
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
                                <div>
                                    {product.price}
                                </div>
                            </div>))
                        }
                    </div>
                </div>
                <div className={style.product_total}>
                    <h4>Subtotal: {total}</h4>
                    <div className={style.checkout_action}>
                        <button>{`<- shop more`}</button>
                        <CheckOutButton email={account?.email} product={account?.cart?.product.map(item => item.id)} >
                            <button >Checkout</button>
                        </CheckOutButton>
                    </div>
                </div>
            </section>
            <section className={style.checkout_account}>
                <div className={style.delivery_title}>
                    <IconLocation_svg />
                    <h3>Delivery Address</h3>
                </div>
                <div className={style.delivery_description}>
                    <label htmlFor="name">Name</label>
                    <p>{account?.name} </p>
                    <label htmlFor="contact">Contact</label>
                    <p>{account?.contact}</p>
                    <label htmlFor="name">Address</label>
                    <p>{`(${account.city})`}  {account?.address}</p>
                </div>
            </section>
        </main>
    )
}
