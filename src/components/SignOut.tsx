"use client"

import { signOut, useSession } from "next-auth/react";


export default function SignOut() {
    const { data, status }: any = useSession();

    console.log("lorem", data, status);

    if (status === "loading")
        return <p>Loading...</p>;
    else if (status !== "loading" && status !== "authenticated") {
        console.log("lorem", data, status);
        return <p>Not Authenticated...</p>;
    }


    return (
        <>
            <h3>Hello  {status + " " + data.user.name}</h3>
            <button onClick={() => signOut()}>SignOut</button>
        </>
    )
}
