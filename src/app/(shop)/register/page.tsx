"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import style from './page.module.scss';


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated")
            router.replace("/admin/users");

    }, [sessionStatus, router]);


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
        const res = await fetch("/api/client/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, username, password }),
        });

        if (res.ok) {
            setName("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            alert("Registration successful!");
            router.push("/login");
        } else {
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
                <span>login here</span>

            </form>
        </section>
    );
}



