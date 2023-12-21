"use client"

import IconHome_svg from '@/assets/IconHome_svg';
import IconProfile_svg from '@/assets/IconProfile_svg';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react'
import style from './layout.module.scss';
import IconOrder_svg from '@/assets/IconOrder_svg';
import IconLogout_svg from '@/assets/IconLogout_svg';
import IconHeart_svg from '@/assets/IconHeart_svg';
import IconCart_svg from '@/assets/IconCart_svg';
import { signOut, useSession } from 'next-auth/react';

export default function AccountLayout({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const { status }: any = useSession();

    if (status !== "loading" && status === "unauthenticated")
        redirect("/account");

    // TODO : CREATE A LAYOUT FOR ACCOUNT
    return (
        <>
            <main className={style.main_layout} >
                <div className={style.side_bar}>
                    <Link href="/account/" className={pathname.endsWith("/account") ? style.active : ""}>
                        <IconProfile_svg />
                        <p>Account</p>
                    </Link>
                    <Link href="/account/order/" className={pathname.startsWith("/account/order") ? style.active : ""}>
                        <IconOrder_svg />
                        <p>Order</p>
                    </Link>
                    <Link href="/account/cart/" className={pathname.startsWith("/account/cart") ? style.active : ""}>
                        <IconCart_svg />
                        <p>Cart</p>
                    </Link>
                    <Link href="/account/like/" className={pathname.startsWith("/account/like") ? style.active : ""}>
                        <IconHeart_svg />
                        <p>Like</p>
                    </Link>
                    <div onClick={() => signOut()} >
                        <IconLogout_svg />
                        <p>Logout</p>
                    </div>
                </div>
                <section className={style.content}>
                    {children}
                </section>
            </main>
        </>
    )
}
