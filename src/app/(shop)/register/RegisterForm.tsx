"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import style from './page.module.scss';
import { CreateAccountAction } from "@/lib/AccountAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { RegisterSchema } from "@/lib/schemas/account";

export default function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    // Already signed in — nothing to register
    useEffect(() => {
        if (status === "authenticated") router.replace("/account");
    }, [status, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const form = new FormData(e.currentTarget);
        const values = {
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? "").trim(),
            password: String(form.get("password") ?? ""),
        };
        const confirmPassword = String(form.get("confirmPassword") ?? "");

        // Same schema the server enforces — instant feedback without a round-trip
        const parsed = RegisterSchema.safeParse(values);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0]?.message ?? "Please check the form", { toastId: "registerError" });
            return;
        }
        if (values.password !== confirmPassword) {
            toast.error("Passwords do not match", { toastId: "registerError" });
            return;
        }

        setIsSubmitting(true);
        const loading = toast.loading("Creating your account…");
        try {
            const res = await CreateAccountAction(values);
            if (res.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2500, isLoading: false });
                router.push("/login");
            } else {
                toast.update(loading, { render: res.message, type: "error", autoClose: 3000, isLoading: false });
            }
        } catch {
            toast.update(loading, { render: "Something went wrong. Please try again.", type: "error", autoClose: 2500, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <div className={style.side}>
                <p className={style.eyebrow}>ReFlair · New members</p>
                <h1 className={style.statement}>
                    Sign up to <em>reinvent</em> your look with <em>pre-loved</em> fashion.
                </h1>
                <p className={style.side_note}>
                    One account for the bag, saved pieces and order history.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <p className={style.eyebrow}>Create an account</p>
                <h2 className={style.title}>Join the archive</h2>

                <div className={style.fields}>
                    <div className={style.field}>
                        <label htmlFor="name">Full name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required minLength={2} maxLength={60} />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" required />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" autoComplete="new-password" required minLength={8} maxLength={72} />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" autoComplete="new-password" required minLength={8} maxLength={72} />
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering…" : "Register"}
                </button>

                <p className={style.switch_note}>
                    Already have an account?{' '}
                    <Link href="/login"><span>Log in here</span></Link>
                </p>
            </form>
        </section>
    );
}
