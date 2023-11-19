"use client"

import Image from 'next/image'
import React from 'react'
import style from './NavigationBar.module.scss'
import Link from 'next/link'
import Home from "../../../assets/Home.svg";


export default function NavigationBar() {

    console.log(Home);

    return (
        <nav className={style.container}>
            <h3>Reflair</h3>
            <div className={style.navigation_bar}>
                {/* <Link >
                    <WEW />
                    Report
                </Link> */}
                <Link href="/admin/product">
                    <SampleSVG />
                    Product
                </Link>
                <Link href="/admin/sales">
                    <SampleSVG />
                    Sales
                </Link>
                <Link href="/admin/employee">
                    <SampleSVG />
                    Employee
                </Link>

                {/* <Home /> */}
            </div>
            <div>My name</div>
        </nav>
    )
}



function SampleSVG() {
    return (
        <svg width="41" height="40" viewBox="0 0 41 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 40V13.3333L20.5 0L40.5 13.3333V40H25.5V24.4444H15.5V40H0.5Z" fill="black" />
        </svg>
    )
}
