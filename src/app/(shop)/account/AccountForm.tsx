'use client'

import SignOut from "@/components/SignOut";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import { FormEvent, useState } from "react";
import { Account } from "@prisma/client";
import { toast } from "react-toastify";
import { AccountUpdateFormAction } from "@/lib/AccountAction";
import Link from "next/link";

interface AccountFormProps {
    user: Account | null;
    barangay: any[];
}

export default function AccountForm({ user, barangay }: AccountFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function FormAction(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { name, city, barangay, contact, address } = event.target as typeof event.target & {
            name: { value: string },
            city: { value: string },
            barangay: { value: string },
            contact: { value: string },
            address: { value: string },
        };

        const accountValue = {
            email: user?.email || "",
            name: name.value,
            city: city.value,
            barangay: barangay.value,
            contact: contact.value,
            address: address.value,
        }


        console.log(accountValue);

        if (isSubmitting)
            return; // If already submitting, prevent additional submissions

        setIsSubmitting(true);
        const loading = toast.loading("Product is pending");



        //action here
        const res = await AccountUpdateFormAction(accountValue);
        if (res?.ok) {
            toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
            router.push("/account");
        }
        else if (res?.error) {
            toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });
        }

        setIsSubmitting(false);; // Reset isSubmitting flag after submission
    }


    return (
        <section className={style.main_container}>
            <form onSubmit={FormAction} className={style.account_form}>
                <h2>Profile</h2>
                <section>
                    <div>
                        <label htmlFor="email">Username</label>
                        <input type="email" name="email" id="email" defaultValue={user?.email} disabled required />
                    </div>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" id="name" defaultValue={user?.name} required />
                    </div>
                    <div>
                        <label htmlFor="contact">Contact</label>
                        <input type="tel" name="contact" id="contact" defaultValue={user?.contact || ""} required />
                    </div>
                </section>
                <section>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" defaultValue={'Bacoor'} disabled required />
                        <span>available only in bacoor</span>
                    </div>
                    <div>
                        <label htmlFor="barangay">Barangay</label>
                        <select id="barangay" defaultValue={user?.barangay || "Molino VI"} required>
                            {barangay?.map((barangay: any) => (
                                <option key={barangay.code} value={barangay.name}>{barangay.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="address">Street Name, Building, House No.</label>
                        <input type="text" name="address" id="address" defaultValue={user?.address || ""} required />
                    </div>
                </section>
                <div className={style.action_container}>
                    <Link href={"/"}><button>Cancel</button></Link>
                    <button type="submit">Update</button>
                </div>
            </form>
        </section>
    )
}
