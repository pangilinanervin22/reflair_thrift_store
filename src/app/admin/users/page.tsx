
import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"

export default async function UsersPage() {
    const allUsers = await prisma.client.findMany()

    console.log(allUsers);

    return (
        <>
            <h3>Users</h3>
            <ul>
                {allUsers.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.username})
                    </li>
                ))}
            </ul>

            <SignOut />
        </>
    )
}
