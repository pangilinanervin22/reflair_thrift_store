"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation"
import style from './NavigationBar.module.scss'
import DropDownHover from '@/components/DropDownHover'
import { signOut } from "next-auth/react";

export default function NavigationBar({ name }: { name: string }) {
    const pathname = usePathname();

    return (
        <nav className={style.nav_container}>
            <div className={style.brand} onClick={() => window.location.replace("/")}>
                <h1>Re<em>Flair</em></h1>
                <span>Atelier</span>
            </div>
            <div className={style.navigation_bar}>
                <Link href="/admin/"
                    className={pathname.endsWith("/admin") ? style.active : ""}>
                    Overview
                </Link>
                <Link href="/admin/product/"
                    className={pathname.startsWith("/admin/product") ? style.active : ""}>
                    Products
                </Link>
                <Link href="/admin/order"
                    className={pathname.startsWith("/admin/order") ? style.active : ""}>
                    Orders
                </Link>
                <Link href="/admin/customer"
                    className={pathname.startsWith("/admin/customer") ? style.active : ""}>
                    Customers
                </Link>
            </div>
            <div className={style.user}>
                <h5>{name || "User"}</h5>
                <DropDownHover
                    trigger={
                        <Image src={"/default_user.png"} alt="" width={68} height={68} sizes="68px" />
                    }
                    content={
                        <section className={style.dropdown_container}>
                            <div className={style.dropdown_item}
                                onClick={() => {
                                    signOut();
                                }}>
                                Sign out
                            </div>
                        </section>
                    }
                />
            </div>
        </nav >
    )
}
