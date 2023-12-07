"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { revalidatePath } from "next/cache";
import { CreateAccountAction } from "@/lib/AccountAction";
import { toast } from "react-toastify";

export default function AdminRegisterForm({ registering }: { registering: Function }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === "authenticated") {
        console.log(session, "session");
        revalidatePath("/admin");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const loading = toast.loading("Registration is pending");

        // get form data
        const formData = e.target;
        const name = (formData as any).name.value;
        const email = (formData as any).email.value;
        const password = (formData as any).password.value;
        const confirmPassword = (formData as any).confirmPassword.value;

        // validation here
        if (password !== confirmPassword)
            toast.update(loading, { render: "Passwords do not match!", type: "error", autoClose: 2000, isLoading: false });

        // action here
        const res = await CreateAccountAction({ name, email, password, role: "admin" });
        console.log(res.ok, "res");
        if (res?.ok) {
            toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
            registering();
        }
        else if (res?.error) {
            toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });
        }

        setIsSubmitting(false);
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



