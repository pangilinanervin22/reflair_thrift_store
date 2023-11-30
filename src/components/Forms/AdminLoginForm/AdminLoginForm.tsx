"use client"

import { FormEvent } from 'react';
import { signIn } from "next-auth/react";
import style from './page.module.scss';

export default function AdminLoginForm({ registering }: { registering: Function }) {


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // const { username, password } = e.target as typeof e.target & {
        //     username: { value: string };
        //     password: { value: string };
        // };

        const formData = e.target;
        const username = (formData as any).username.value;
        const password = (formData as any).password.value;

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
                    <input id="username" type="text" placeholder="Enter Email" />
                    <label htmlFor="username">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" required />
                    <button type="submit">Log In</button>
                    <p>Don&#39;t have a account</p>
                    <span onClick={() => registering()}>register here</span>
                </form>
            </section>
        </main>
    );
}



