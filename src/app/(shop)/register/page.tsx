"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { CreateAccountAction } from "@/lib/AccountAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/email_validation";

export default function ClientRegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    if (sessionStatus === "authenticated") {
        router.push("/account");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const loading = toast.loading("Registration is pending");

        try {
            // get form data
            const formData = e.target;
            const name = (formData as any).name.value;
            const email = (formData as any).email.value;
            const password = (formData as any).password.value;
            const confirmPassword = (formData as any).confirmPassword.value;

            // validation here
            if (!validateEmail(email)) {
                toast.update(loading, { render: "Invalid Email!", type: "error", autoClose: 2000, isLoading: false });
                return;
            }
            if (password !== confirmPassword) {
                toast.update(loading, { render: "Passwords do not match!", type: "error", autoClose: 2000, isLoading: false });
                return;
            }

            // action here
            const res = await CreateAccountAction({ name, email, password, });
            if (res?.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
                router.push("/login");
            }
            else if (res?.error)
                toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });

        } catch (error) {
            toast.update(loading, { render: 'Error occurred', type: "error", autoClose: 2000, isLoading: false });
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
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            required
                            minLength={8}
                        />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="you@example.com"
                            required
                            minLength={8}
                        />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            minLength={8}
                        />
                    </div>
                    <div className={style.field}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            required
                            minLength={8}
                        />
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering…" : "Register"}
                </button>

                <p className={style.switch_note}>
                    Already have an account?{' '}
                    <span onClick={() => router.push("/login")}>Log in here</span>
                </p>
            </form>
        </section>
    );
}
