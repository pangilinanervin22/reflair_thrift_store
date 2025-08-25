"use client"

import { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import style from './page.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { isEmailExist } from '@/lib/AccountAction';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';

const font = Playfair_Display({
    display: 'swap',
    weight: "600",
    subsets: ['latin'],
});

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const { status }: any = useSession();
    const router = useRouter();

    // Avoid router updates during render; redirect after mount when authenticated
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/account");
        }
    }, [status, router]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) return;

        setSubmitting(true);
        const loading = toast.loading("Login is pending");

        try {
            const formEl = e.currentTarget;
            const formData = new FormData(formEl);
            const email = String(formData.get('email') || '').trim();
            const password = String(formData.get('password') || '').trim();

            // validation here
            if (!email || !password) {
                toast.update(loading, { render: "Please fill in all fields", type: "error", autoClose: 2000, isLoading: false })
                return;
            } else if (!(await isEmailExist(email))) {
                toast.update(loading, { render: "Email not exist", type: "error", autoClose: 2000, isLoading: false });
                return;
            }

            // action here
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.ok) {
                toast.update(loading, { render: "Login Success", type: "success", autoClose: 2000, isLoading: false });
            } else if (res?.error) {
                toast.update(loading, { render: "Invalid credentials", type: "error", autoClose: 2000, isLoading: false });
                return;
            }
        } catch (error) {
            toast.update(loading, { render: "Error occurred", type: "error", autoClose: 2000, isLoading: false });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <div className={style.side}>
                <Image src={"/assets/images/loginbgimage.jpg"} alt='wew' width={"1080"} height={"1080"} />
            </div>
            <form onSubmit={handleSubmit}>
                <h1 className={font.className}>Welcome to ReFlair</h1>
                <h4> Unearth the Hidden Flair of Timeless Fashion</h4>
                <hr className={style.underline} />
                <input id='email' name='email' type="email" placeholder='Enter Email' autoComplete="email" required />
                <input id='password' name='password' type="password" placeholder='Enter Password' autoComplete="current-password" required />
                <button type="submit">Log In</button>
                <p>Don&#39;t have an Account?</p>
                <Link href={"/register"}><span>Register Here</span></Link>
                <hr className={style.underline} />
            </form>
        </section>

    );
}



