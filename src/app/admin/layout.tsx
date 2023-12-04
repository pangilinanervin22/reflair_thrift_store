
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
    console.log(session, "session layout");

    if (!session) return (<AdminAuth />)
    if (session?.user.role !== "admin") return (<Unauthorized />)

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


// "use client"

// import ModalContainer from "@/components/Modal/ModalContainer"
// import NavigationBar from "@/components/AdminComponent/NavigationBar/NavigationBar"
// import AdminAuth from "@/components/AdminComponent/AdminAuth";
// import style from "./layout.module.scss";
// import { useSession } from "next-auth/react";

// export default function AdminPageLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {

//     const { data: session, status }: any = useSession();
//     console.log("lorem", session, status);

//     if (status === "loading")
//         return <h1>Loading...</h1>;

//     if (!session)
//         return (
//             <>
//                 <AdminAuth />
//             </>
//         )

//     return (
//         <>
//             <NavigationBar name={session.user?.name || "wew"} />
//             <main className={style.admin_layout}>
//                 {children}
//             </main>
//             <ModalContainer />
//         </>
//     )
// }