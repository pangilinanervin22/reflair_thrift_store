import ModalContainer from "@/components/Modal/ModalContainer"
import NavigationBar from "@/components/AdminComponent/NavigationBar/NavigationBar"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminAuth from "@/components/AdminComponent/AdminAuth";

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
            {children}
            <h1>Employee </h1>
            <ModalContainer />
        </>
    )
}