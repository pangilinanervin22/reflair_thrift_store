"use client"

import { signOut, useSession } from "next-auth/react";
import React from 'react'
import style from "./index.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function Unauthorized() {
    const { status }: any = useSession();

    let content;
    if (status === "loading")
        content = <p>Loading...</p>;
    else if (status !== "loading" && status !== "authenticated")
        content = <p>No credentials...</p>; // Modified message for unauthorized user
    else
        content = <div>
            <p>You login credentials are unauthorized to access this page.</p>
            <div className={style.action}>
                <Link href={"/"}>
                    <button className={style.action_button}>HOME PAGE</button>
                </Link>
                <button className={style.action_button} onClick={() => signOut()}>SIGN OUT</button>
            </div>
        </div>

    return (
        <main className={style.container}>
            <Image src={"/alert.png"} alt="warning image" width={220} height={180} />
            {content}
        </main>
    )
}
