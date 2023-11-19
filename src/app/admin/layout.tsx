
export default function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
            <h1>Employee </h1>
        </div>
    )
}