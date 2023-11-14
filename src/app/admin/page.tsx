
// export default async function UserPage() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users',
//         { cache: "no-store", next: { revalidate: 10 } });
//     const users = await res.json();

//     return (
//         <div>UserPage
//             <ul>
//                 {users.map((user: any) => (<li key={user.id}>{user.name}</li>))}
//             </ul>
//         </div>
//     )
// }


import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"
import { getSession, useSession } from "next-auth/react";

export default async function UsersPage() {
    const allUsers = await prisma.client.findMany()

    return (
        <>
            <h3>Users</h3>
            <br />
            <ul>
                {allUsers.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.username})
                    </li>
                ))}
            </ul>
            <br />
            <SignOut />
        </>
    )
}
