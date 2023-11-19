import NavBar from "@/components/NavigationBar/NavigationBar"

export default function ShopPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
        </>
    )
}