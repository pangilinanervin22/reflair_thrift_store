import SignOut from "@/components/SignOut"
import NavigationBar from "@/components/admin/NavigationBar/NavigationBar"

export default function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <NavigationBar />
            {children}
            <h1>Employee </h1>
            <SignOut />
        </div>
    )
}