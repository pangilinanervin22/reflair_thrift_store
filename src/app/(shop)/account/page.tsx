
import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import style from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import prisma from "@/db/prisma";


export default async function AccountPage() {
    // const { data, status }: any = useSession();
    // TODO:create a order history page and a account profile page
    const data = await getServerSession(authOptions);
    if (!data) redirect("/login");

    console.log(data?.user.email);
    const user = await prisma.account.findUnique({
        where: {
            email: data?.user.email
        }
    });
    console.log(data, "session");
    console.log(user, "user");

    const city = await fetch("https://psgc.gitlab.io/api/cities/042103000/barangays/", { cache: "force-cache" });
    const barangay = await city.json();
    console.log(barangay, "barangay");



    return (
        <>
            <section className={style.main_container}>
                <form action="" className={style.account_form}>
                    <h2>Account Profile</h2>

                    <section>
                        <div>
                            <label htmlFor="email">Username</label>
                            <input type="email" name="email" id="email" defaultValue={user?.email} disabled />
                        </div>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" name="name" id="name" defaultValue={user?.name} />
                        </div>
                        <div>
                            <label htmlFor="contact">Contact</label>
                            <input type="text" name="contact" id="contact" defaultValue={user?.contact || ""} />
                        </div>
                    </section>

                    <section>
                        <div>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" defaultValue={'Bacoor'} disabled />
                            <span>available only in bacoor</span>
                        </div>
                        <div>
                            <label htmlFor="barangay">Barangay</label>
                            <select id="barangay" defaultValue={user?.barangay || ""}>
                                {barangay?.map((barangay: any) => (
                                    <option key={barangay.code} value={barangay.name}>{barangay.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="city">House/Unit/Blk or Lot #</label>
                            <input type="text" name="city" id="city" />
                        </div>
                    </section>
                    <div className={style.action_container}>
                        <button>Cancel</button>
                        <button type="submit">Update</button>
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
