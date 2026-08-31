"use client"

import { FormEvent, useState } from 'react';
import { signIn } from "next-auth/react";
import style from './page.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AdminLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const loading = toast.loading("Signing you in…");

        try {
            const form = new FormData(e.currentTarget);
            const email = String(form.get("email") ?? "").trim();
            const password = String(form.get("password") ?? "");

            if (!email || !password) {
                toast.update(loading, { render: "Please fill in all fields", type: "error", autoClose: 2000, isLoading: false });
                return;
            }

            const res = await signIn("credentials", { email, password, redirect: false });

            if (res?.ok) {
                toast.update(loading, { render: "Signed in", type: "success", autoClose: 1500, isLoading: false });
                router.refresh(); // admin/layout re-renders with the session
            } else {
                // One generic message — never reveal whether the email exists
                toast.update(loading, { render: "Invalid email or password", type: "error", autoClose: 2500, isLoading: false });
            }
        } catch {
            toast.update(loading, { render: "Something went wrong. Please try again.", type: "error", autoClose: 2500, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.title}>
                    <h1>Re<em>Flair</em></h1>
                    <p>Atelier · Employee access</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="you@reflair.com" autoComplete="email" required />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in…" : "Log in"}
                    </button>
                </form>
            </section>
        </main>
    );
}
