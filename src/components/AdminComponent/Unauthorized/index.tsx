"use client"

import { signOut, useSession } from "next-auth/react";
import React from 'react'
import style from "./index.module.scss"
import Link from "next/link";

export default function Unauthorized() {
    const { status }: any = useSession();

    let content;
    if (status === "loading")
        content = <p className={style.note}>Loading…</p>;
    else if (status !== "loading" && status !== "authenticated")
        content = <p className={style.note}>No credentials…</p>;
    else
        content = <>
            <p className={style.note}>Your credentials are not authorized to enter the atelier.</p>
            <div className={style.action}>
                <Link href={"/"}>
                    <button className={style.action_button}>Return to the store</button>
                </Link>
                <button className={`${style.action_button} ${style.solid}`} onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        </>

    return (
        <main className={style.container}>
            <p className={style.eyebrow}>ReFlair Atelier · Staff only</p>
            <h1 className={style.title}>Private <em>premises</em></h1>
            {content}
        </main>
    )
}
