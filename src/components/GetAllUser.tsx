import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma"

export default async function GetListClient() {
    const allClient = await prisma.client.findMany()

    return (
        <>
            <h3>Users</h3>
            <ul>
                {allClient.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.username})
                    </li>
                ))}
            </ul>

        </>
    )
}