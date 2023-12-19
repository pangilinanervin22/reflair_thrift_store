"use client"

import { FormEvent, useState } from 'react';
import { signIn } from "next-auth/react";
import style from './page.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import prisma from '@/db/prisma';
import { isEmailExist } from '@/lib/AccountAction';

export default function AdminLoginForm({ registering }: { registering: Function }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const loading = toast.loading("Login is pending");

        try {
            // get form data
            const formData = e.target;
            const email = (formData as any).email.value;
            const password = (formData as any).password.value;

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
                router.refresh();
            } else if (res?.error) {
                toast.update(loading, { render: "Invalid credentials", type: "error", autoClose: 2000, isLoading: false });
            }
        } catch (error) {
            toast.update(loading, { render: "Error occurred", type: "error", autoClose: 2000, isLoading: false });
        } finally {
            setIsSubmitting(false);
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
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" required />
                    <label htmlFor="email">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" required />
                    <button type="submit">Log In</button>
                    <p>Don&#39;t have a account</p>
                    <span onClick={() => registering()}>register here</span>
                </form>
            </section>
        </main>
    );
}



