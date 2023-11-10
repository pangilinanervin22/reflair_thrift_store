import Link from "next/link"

export default function ShopPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>
                <Link href="/">Main</Link>
                <Link href="/item">Item</Link>
            </nav>
            <div>
                <h1>Shop</h1>
                {children}
            </div>
        </>
    )
}