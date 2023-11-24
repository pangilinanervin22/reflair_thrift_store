"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation"
import style from './NavigationBar.module.scss'
import IconHome_svg from '@/assets/IconHome_svg'
import IconPerson_svg from '@/assets/IconPerson_svg'
import IconMoney_svg from '@/assets/IconMoney_svg'
import IconHeart_svg from '@/assets/IconHeart_svg'
import DropDownHover from '@/components/DropDownHover'
import { signOut } from "next-auth/react";
import IconLogout_svg from '@/assets/IconLogout_svg'


export default function NavigationBar({ name }: { name: string }) {
    const pathname = usePathname();

    return (
        <nav className={style.container}>
            <h3>Reflair</h3>
            <div className={style.navigation_bar}>
                <Link href="/admin/"
                    className={pathname.endsWith("/admin") ? style.active : ""}>
                    <IconHome_svg />
                    <h4>Home</h4>
                </Link>
                <Link href="/admin/product/"
                    className={pathname.startsWith("/admin/product") ? style.active : ""}>
                    <IconHeart_svg />
                    <h4>Product</h4>
                </Link>
                <Link href="/admin/sales"
                    className={pathname.startsWith("/admin/sales") ? style.active : ""}>
                    <IconMoney_svg />
                    <h4>Sales</h4>
                </Link>
                <Link href="/admin/employee"
                    className={pathname.startsWith("/admin/employee") ? style.active : ""}>
                    <IconPerson_svg />
                    <h4>Employee</h4>
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

