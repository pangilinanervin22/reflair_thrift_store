"use client"

import { FormEvent, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import SignOut from '@/components/SignOut';
import style from './page.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import wait from '@/utils/wait';


export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const { status }: any = useSession();

    if (status !== "loading" && status === "authenticated")
        redirect("/account");


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (submitting) return;
        setSubmitting(true);
        const loading = toast.loading("Login is pending");

        const formData = e.target;
        const email = (formData as any).email.value;
        const password = (formData as any).password.value;

        if (!email || !password) {
            toast.update(loading, { render: "Please fill in all fields", type: "error", autoClose: 2000, isLoading: false })
            return;
        }

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.ok)
            toast.update(loading, { render: "All is good", type: "success", autoClose: 2000, isLoading: false });
        else if (res?.error)
            toast.update(loading, { render: "Invalid credentials", type: "error", autoClose: 2000, isLoading: false });

        setSubmitting(false);
    };

    return (
        <>
            {status === "authenticated" ? <SignOut />
                :
                <section className={style.container}>
                    <h1>Welcome to ReFlair</h1>
                    <p> Unearth the Hidden Flair of Timeless Fashion</p>
                    <form onSubmit={handleSubmit}>
                        <input id='email' type="text" placeholder='Enter Email' required />
                        <input id='password' type="password" placeholder='Enter Password' required />
                        <button type="submit">Log In</button>
                        <p>Don&#39;t have a account</p>
                        <Link href={"/register"}><span>register here</span></Link>
                    </form>
                </section>
            }
        </>
    );
}



