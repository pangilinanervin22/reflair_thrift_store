export default function ShopPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <section>
                {children}
            </section>
        </>
    )
}