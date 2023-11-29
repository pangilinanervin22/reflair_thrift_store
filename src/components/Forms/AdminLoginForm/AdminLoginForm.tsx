"use client"

import { FormEvent, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import style from './page.module.scss';
import { revalidatePath } from 'next/cache';



export default function AdminLoginForm({ registering }: { registering: Function }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

            if (res?.error) {
                alert("Invalid Credentials");
                return;
            }

            if (res?.ok) {
                console.log("ok");
                alert("Login successful!");
                window.location.reload();
            };


        } catch (error) {
            console.log(error);
        }
    };
    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.title}>
                    <h1>ReFlair</h1>
                    <p>Employee Access</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id='username' type="text" placeholder='Enter Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="username">Password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Log In</button>
                    <p>Don&#39;t have a account</p>
                    <span onClick={() => registering()}>register here</span>
                </form>
            </section>
        </main>
    );
}



