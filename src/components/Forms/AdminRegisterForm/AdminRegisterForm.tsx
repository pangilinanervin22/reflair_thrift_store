"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { CreateAccountAction } from "@/lib/AccountAction";

export default function AdminRegisterForm({ registering }: { registering: Function }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === "authenticated") {
        console.log(session, "session");
        revalidatePath("/admin");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

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
            const res = await CreateAccountAction({ name, username, password });
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
                    value={name}
                    placeholder="Enter Name"
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button type="submit">Register</button>

                <p>if you already have account you can login here</p>
                <span onClick={() => registering()}>login here</span>

            </form>
        </section>
    );
}



