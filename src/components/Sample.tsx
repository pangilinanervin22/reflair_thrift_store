"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Sample() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>No account have login</p>
    }

    return (
        <>
            <h4>Account that login {session?.user?.name} </h4>
            <button onClick={() => signOut()}>signout</button>
        </>
    )
}