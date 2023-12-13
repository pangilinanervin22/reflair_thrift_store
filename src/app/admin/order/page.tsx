
import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"

export default async function OrderPage() {
    const allUsers = await prisma.account.findMany()

    return (
        <>
            <h3>Users</h3>
            <ul>
                {allUsers.length > 0 && allUsers.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
            <SignOut />
        </>
    )
}
