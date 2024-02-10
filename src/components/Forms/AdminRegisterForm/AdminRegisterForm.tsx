"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { revalidatePath } from "next/cache";
import { CreateAccountAction } from "@/lib/AccountAction";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/email_validation";

export default function AdminRegisterForm({ registering }: { registering: Function }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === "authenticated")
        revalidatePath("/admin");


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
            else if (password !== confirmPassword) {
                toast.update(loading, { render: "Password don't match!", type: "error", autoClose: 2000, isLoading: false });
                return;
            }

            // action here
            const res = await CreateAccountAction({ name, email, password, role: "admin" });

            if (res?.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
                registering();
            }
            else if (res?.error) {
                toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });
            }

        } catch (error) {
            toast.update(loading, { render: 'Error occurred', type: "error", autoClose: 2000, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <h1>ReFlair</h1>
            <p> Unearth the Hidden Flair of Timeless Fashion</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    required
                />
                <input
                    type="text"
                    id="email"
                    placeholder="Enter Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                />

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Register</button>
                <p>if you already have account you can login here</p>
                <span onClick={() => registering()}>login here</span>
            </form>
        </section>
    );
}



