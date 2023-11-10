export default function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <h1>Employee</h1>
            {children}
        </div>
    )
}