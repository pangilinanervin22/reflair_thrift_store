"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import style from './layout.module.scss';
import { signOut, useSession } from 'next-auth/react';

// Client shell for /account/*: side navigation with the active state, sign-out,
// and a client-side guard. Every account page also checks the session on the
// server, so this is defence in depth rather than the gate.
export default function AccountShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/login?callbackUrl=" + encodeURIComponent(pathname));
    }, [status, router, pathname]);

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
                <button className={style.logout} onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign out
                </button>
            </aside>
            <section className={style.content}>
                {children}
            </section>
        </main>
    )
}
