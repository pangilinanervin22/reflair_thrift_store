import { authOptions } from '@/db/options';
import React from 'react'
import { getServerSession } from 'next-auth';
import prisma from '@/db/prisma';
import CheckOutButton from './CheckOutButton';
import { redirect, useRouter } from 'next/navigation';

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

    return (
        <main>
            <div>
                <h1>Checkout</h1>

                <div>
                    <h3>Delivery Address</h3>
                    <div>
                        <h4>{account?.name} {account?.contact}</h4>
                        <p>{account?.address}</p>
                    </div>
                </div>
                <CheckOutButton email={account?.email} product={account?.cart?.product.map(item => item.id)} />
                <button>{`<- shop more`}</button>
            </div>
        </main>
    )
}
