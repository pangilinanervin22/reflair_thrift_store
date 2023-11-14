"use client"

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function SignOut() {
    const { data, status }: any = useSession();

    console.log(data, status);

    if (status !== "authenticated")
        redirect("/login");

    return (
        <>
            <h3>Hello  {status + " " + data.user.name}</h3>
            <button onClick={() => signOut()}>SignOut</button>
        </>
    )
}
