
import SignOut from "@/components/SignOut";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import style from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";


export default async function AccountPage() {
    // const { data, status }: any = useSession();
    const data = await getServerSession(authOptions);
    console.log(data?.user.email);
    const user = prisma.account.findUnique({
        where: {
            email: data?.user.email
        }
    });

    console.log();

    if (!data)
        redirect("/login");


    return (
        <>
            <section className={style.main_container}>
                <h1>Account Profile</h1>
                <form action="" className={style.account_form}>
                    <div>
                        <label htmlFor="email">Username</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label htmlFor="contact">Contact</label>
                        <input type="text" name="contact" id="contact" />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" />
                    </div>
                    <div>
                        <label htmlFor="barangay">Barangay</label>
                        <input type="text" name="barangay" id="barangay" />
                    </div>
                    <div>
                        <label htmlFor="city">StreetName, Building, House No.</label>
                        <input type="text" name="city" id="city" />
                    </div>
                </form>
            </section>
            <div>
                <h1>Account</h1>
                <SignOut />
            </div>
        </>
    )
}
