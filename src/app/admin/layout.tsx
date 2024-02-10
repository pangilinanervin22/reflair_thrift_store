
import ModalContainer from "@/components/Modal/ModalContainer"
import NavigationBar from "@/components/AdminComponent/NavigationBar/NavigationBar"
import { getServerSession } from "next-auth";
import AdminAuth from "@/components/AdminComponent/AdminAuth";
import style from "./layout.module.scss";
import { authOptions } from "@/db/options";
import Unauthorized from "@/components/AdminComponent/Unauthorized";

export default async function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions);

    if (!session) return (<AdminAuth />)
    if (session?.user.role !== "admin") return (<Unauthorized />)

    return (
        <>
            <NavigationBar name={session.user?.name || ""} />
            <main className={style.admin_layout}>
                {children}
            </main>
            <ModalContainer />
        </>
    )
}