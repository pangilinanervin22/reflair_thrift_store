"use client"

import { FormEvent, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res!.error) {
                alert("Invalid Credentials");
                return;
            }

            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }


        // console.log(`Submitting username ${username} and password ${password}`);
        // const res = await fetch('/api/client/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),
        // });

        // if (res.ok) {
        //     console.log(res.body);

        //     const { token } = await res.json();
        //     alert(`Logged in with token ${token}`);
        //     setUsername('');
        //     setPassword('');
        // } else {
        //     alert("Login failed!");
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Log In</button>
        </form>
    );
}



