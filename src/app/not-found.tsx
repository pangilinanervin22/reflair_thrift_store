"use client"

import Link from "next/link"
import style from "./not-found.module.scss"

export default function NotFound() {
    return (
        <div className={style.wrapper}>
            <p className={style.eyebrow}>ReFlair · Lost in the archive</p>
            <h1 className={style.code}>4<em>0</em>4</h1>
            <p className={style.note}>This piece has already found a new home.</p>
            <Link href="/" className={style.home}>Return to the store</Link>
        </div>
    )
}
