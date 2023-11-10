export default async function UserPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users',
        { cache: "no-store", next: { revalidate: 10 } });
    const users = await res.json();

    return (
        <div>UserPage
            <ul>
                {users.map((user: any) => (<li key={user.id}>{user.name}</li>))}
            </ul>
        </div>
    )
}