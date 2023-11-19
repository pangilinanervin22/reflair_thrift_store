"use client"

import { FormEvent, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import SignOut from '@/components/SignOut';
import style from './page.module.scss';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { data, status }: any = useSession();

    if (status === "authenticated") redirect("/");


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Please fill in all fields!");
            return;
        }
        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            console.log(res, data, "wew", status);
            if (res?.error) {
                alert("Invalid Credentials");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {status === "authenticated" ? <SignOut />
                :
                <section className={style.container}>
                    <h1>ReFlair</h1>
                    <p> Unearth the Hidden Flair of Timeless Fashion</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Log In</button>
                        <p>Don&#39;t have a account</p>
                        <span>register here</span>
                    </form>
                </section>
            }
        </>
    );
}



