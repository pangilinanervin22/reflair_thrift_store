"use client"

import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

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
            console.log("Registration successful!");
            router.push("/");
        } else {
            alert("Registration failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                Confirm Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
}



