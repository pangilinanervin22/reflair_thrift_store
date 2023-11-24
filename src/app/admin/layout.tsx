import ModalContainer from "@/components/Modal/ModalContainer"
import NavigationBar from "@/components/AdminComponent/NavigationBar/NavigationBar"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminAuth from "@/components/AdminComponent/AdminAuth";
import style from "./layout.module.scss";

export default async function AdminPageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions);
    console.log(session, "session layout");

    if (!session)
        return (
            <>
                <AdminAuth />
            </>
        )

    return (
        <>
            <NavigationBar name={session.user?.name || "wew"} />
            <main className={style.admin_layout}>
                {children}
            </main>
            <ModalContainer />
        </>
    )
}