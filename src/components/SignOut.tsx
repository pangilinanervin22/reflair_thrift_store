"use client"

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function SignOut() {
    const { data, status }: any = useSession();

    // console.log("lorem", data, status);

    // if (status === "loading")
    //     return <p>Loading...</p>;
    // else if (status !== "loading" && status !== "authenticated") {
    //     console.log("lorem", data, status);
    //     redirect("/login");
    // }


    return (
        <>
            <h3>Hello  {status + " " + data.user.name}</h3>
            <button onClick={() => signOut()}>SignOut</button>
        </>
    )
}
