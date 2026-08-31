import type { Metadata } from "next";
import NavigationBar from "@/components/AdminComponent/NavigationBar/NavigationBar"
import AdminLoginForm from "@/components/Forms/AdminLoginForm/AdminLoginForm";
import style from "./layout.module.scss";
import Unauthorized from "@/components/AdminComponent/Unauthorized";
import { getSessionUser } from "@/lib/auth";

// Private area — never indexed
export const metadata: Metadata = {
    title: "Atelier",
    robots: { index: false, follow: false },
};

export default async function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Rendering gate only — every admin server action re-checks the role itself
    // (requireAdmin). The role comes from the database, not the JWT.
    const user = await getSessionUser();

    if (!user) return (<AdminLoginForm />)
    if (user.role !== "admin") return (<Unauthorized />)

    return (
        <>
            <NavigationBar name={user.name} />
            <main className={style.admin_layout}>
                {children}
            </main>
        </>
    )
}
