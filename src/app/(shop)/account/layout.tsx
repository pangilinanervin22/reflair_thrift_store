"use client"

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React from 'react'
import style from './layout.module.scss';
import { signOut, useSession } from 'next-auth/react';

export default function AccountLayout({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { status }: any = useSession();

    if (status !== "loading" && status !== "authenticated")
        redirect("/login");

    return (
        <main className={style.main_layout} >
            <aside className={style.side_bar}>
                <p className={style.side_title}>My account</p>
                <nav className={style.side_nav}>
                    <Link href="/account/" className={pathname.endsWith("/account") ? style.active : ""}>
                        Profile
                    </Link>
                    <Link href="/account/order/" className={pathname.startsWith("/account/order") ? style.active : ""}>
                        Orders
                    </Link>
                    <Link href="/account/cart/" className={pathname.startsWith("/account/cart") ? style.active : ""}>
                        Bag
                    </Link>
                    <Link href="/account/like/" className={pathname.startsWith("/account/like") ? style.active : ""}>
                        Saved
                    </Link>
                </nav>
                <button className={style.logout} onClick={() => signOut()}>
                    Sign out
                </button>
            </aside>
            <section className={style.content}>
                {children}
            </section>
        </main>
    )
}
