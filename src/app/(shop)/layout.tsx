
import FooterBar from "@/components/FooterBar/FooterBar"
import NavigationBar from "@/components/NavigationBar/NavigationBar"
import style from "./layout.module.scss"

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavigationBar />
            <main className={style.main_container}>
                {children}
            </main>
            <FooterBar />
        </>
    )
}