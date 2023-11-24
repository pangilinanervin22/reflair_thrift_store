
import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"

export default async function UsersPage() {
    const allUsers = await prisma.account.findMany()

    // console.log(allUsers, "wew");

    return (
        <>
            <h3>Users</h3>
            <ul>
                {allUsers.length > 0 && allUsers.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.username})
                    </li>
                ))}
            </ul>
            <SignOut />
        </>
    )
}
