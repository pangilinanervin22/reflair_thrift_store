"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation"
import style from './NavigationBar.module.scss'
import IconHome_svg from '@/assets/IconHome_svg'
import IconPerson_svg from '@/assets/IconPerson_svg'
import IconMoney_svg from '@/assets/IconMoney_svg'
import DropDownHover from '@/components/DropDownHover'
import IconLogout_svg from '@/assets/IconLogout_svg'
import IconCloth_svg from '@/assets/IconCloth_svg'
import IconOrder_svg from '@/assets/IconOrder_svg'
import { signOut } from "next-auth/react";
import { Playfair_Display } from 'next/font/google'

const font = Playfair_Display({
    display: 'swap',
    weight: "400",
    subsets: ['latin'],
});

export default function NavigationBar({ name }: { name: string }) {
    const pathname = usePathname();

    return (
        <nav className={style.nav_container}>
            <h1 className={font.className} onClick={() => window.location.replace("/")}>Reflair</h1>
            <div className={style.navigation_bar}>
                <Link href="/admin/"
                    className={pathname.endsWith("/admin") ? style.active : ""}>
                    <IconHome_svg />
                    <h4>Home</h4>
                </Link>
                <Link href="/admin/product/"
                    className={pathname.startsWith("/admin/product") ? style.active : ""}>
                    <IconCloth_svg />
                    <h4>Product</h4>
                </Link>
                <Link href="/admin/sales"
                    className={pathname.startsWith("/admin/sales") ? style.active : ""}>
                    <IconMoney_svg />
                    <h4>Sales</h4>
                </Link>
                <Link href="/admin/order"
                    className={pathname.startsWith("/admin/order") ? style.active : ""}>
                    <IconOrder_svg />
                    <h4>Order</h4>
                </Link>
            </div>
            <div>
                <h5>{name || "User"}</h5>
                <DropDownHover
                    trigger={
                        <Image src={"/default_user.png"} alt="User Picture" width={1920} height={1080} />
                    }
                    content={
                        <section className={style.dropdown_container}>
                            <div className={style.dropdown_item} >
                                <IconPerson_svg />
                                <h2>Account</h2>
                            </div>
                            <div className={style.dropdown_item}
                                onClick={() => {
                                    signOut();
                                }}>
                                <IconLogout_svg />
                                <h2>Logout</h2>
                            </div>
                        </section>
                    }
                />
            </div>
        </nav >
    )
}

