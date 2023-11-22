import FooterBar from "@/components/FooterBar/FooterBar"
import NavigationBar from "@/components/NavigationBar/NavigationBar"

export default function ShopPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavigationBar />
            <main>
                {children}
            </main>
            <FooterBar />
        </>
    )
}