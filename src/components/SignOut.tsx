"use client"

import { signOut, useSession } from "next-auth/react";


export default function SignOut() {
    const { data, status }: any = useSession();

    if (status === "loading")
        return <p>Loading...</p>;
    else if (status !== "loading" && status !== "authenticated") {
        return <p>Not Authenticated...</p>;
    }
    return (
        <>
            {/* <h3>Hello  {status + " " + data.user.name}</h3> */}
            <button onClick={() => signOut()}>SignOut</button>
        </>
    )
}
