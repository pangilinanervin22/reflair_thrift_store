"use client"

import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import style from './page.module.scss';
import { revalidatePath } from "next/cache";
import { CreateAccountAction } from "@/lib/AccountAction";

export default function AdminRegisterForm({ registering }: { registering: Function }) {

    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === "authenticated") {
        console.log(session, "session");
        revalidatePath("/admin");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = e.target;
        const name = (formData as any).name.value;
        const username = (formData as any).username.value;
        const password = (formData as any).password.value;
        const confirmPassword = (formData as any).confirmPassword.value;

        if (!name || !username || !password || !confirmPassword) {
            alert("Please fill in all fields!");
            return;
        }
        else if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log(name, username, password, confirmPassword);
        // const res = await fetch("/api/account/register", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name, username, password }),
        // });
        try {
            // pass role as parameter
            await CreateAccountAction({ name, username, password });

            alert("Registration successful!");
            registering();
        } catch (error) {
            alert("Registration failed!");
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
                />
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                />

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                />
                <button type="submit">Register</button>
                <p>if you already have account you can login here</p>
                <span onClick={() => registering()}>login here</span>

            </form>
        </section>
    );
}



