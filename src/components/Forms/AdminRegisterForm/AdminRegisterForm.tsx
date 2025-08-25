"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { CreateAccountAction } from "@/lib/AccountAction";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/email_validation";

export default function AdminRegisterForm({ registering }: { registering: Function }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status: sessionStatus } = useSession();



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const loading = toast.loading("Registration is pending");

        try {
            // get form data
            const formEl = e.currentTarget;
            const fd = new FormData(formEl);
            const name = String(fd.get('name') || '').trim();
            const email = String(fd.get('email') || '').trim();
            const password = String(fd.get('password') || '').trim();
            const confirmPassword = String(fd.get('confirmPassword') || '').trim();

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
                <input type="text" id="name" name="name" placeholder="Enter Name" autoComplete="name" required />
                <input type="email" id="email" name="email" placeholder="Enter Email" autoComplete="email" required />
                <input type="password" id="password" name="password" placeholder="Enter Password" autoComplete="new-password" required />
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" required />
                <button type="submit">Register</button>
                <p>if you already have account you can login here</p>
                <span onClick={() => registering()}>login here</span>
            </form>
        </section>
    );
}



