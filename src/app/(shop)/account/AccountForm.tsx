'use client'

import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AccountUpdateFormAction } from "@/lib/AccountAction";
import { AccountUpdateSchema, type AccountUpdateInput } from "@/lib/schemas/account";
import type { Barangay } from "@/lib/bacoorBarangays";

export interface AccountFormUser {
    email: string;
    name: string;
    contact: string | null;
    barangay: string | null;
    address: string | null;
}

interface AccountFormProps {
    user: AccountFormUser;
    barangay: readonly Barangay[];
}

export default function AccountForm({ user, barangay }: AccountFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function FormAction(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;

        const form = new FormData(event.currentTarget);
        const values: AccountUpdateInput = {
            name: String(form.get("name") ?? ""),
            contact: String(form.get("contact") ?? ""),
            barangay: String(form.get("barangay") ?? ""),
            address: String(form.get("address") ?? ""),
        };

        const unchanged =
            values.name === user.name &&
            values.contact === (user.contact ?? "") &&
            values.barangay === (user.barangay ?? "") &&
            values.address === (user.address ?? "");
        if (unchanged) {
            toast.info("No changes to save", { toastId: "noChange" });
            return;
        }

        const parsed = AccountUpdateSchema.safeParse(values);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0]?.message ?? "Please check the form", { toastId: "formAccountError" });
            return;
        }

        setIsSubmitting(true);
        const loading = toast.loading("Saving your profile…", { toastId: "formAccount" });
        try {
            const res = await AccountUpdateFormAction(parsed.data);
            if (res.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
                router.refresh();
            } else {
                toast.update(loading, { render: res.message, type: "error", autoClose: 3000, isLoading: false });
            }
        } catch {
            toast.update(loading, { render: "Something went wrong. Please try again.", type: "error", autoClose: 2500, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className={style.main_container}>
            <form onSubmit={FormAction} className={style.account_form}>
                <h1>Profile</h1>
                <section>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={user.email} disabled />
                    </div>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" id="name" defaultValue={user.name} autoComplete="name" required />
                    </div>
                    <div>
                        <label htmlFor="contact">Contact</label>
                        <input type="tel" name="contact" id="contact" defaultValue={user.contact || ""} placeholder="09171234567" autoComplete="tel" required />
                    </div>
                </section>
                <section>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" defaultValue={'Bacoor'} disabled />
                        <span>Delivery is currently available in Bacoor only.</span>
                    </div>
                    <div>
                        <label htmlFor="barangay">Barangay</label>
                        <select name="barangay" id="barangay" defaultValue={user.barangay || "Molino VI"} required>
                            {barangay?.map((item) => (
                                <option key={item.code} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="address">Street Name, Building, House No.</label>
                        <input type="text" name="address" id="address" defaultValue={user.address || ""} autoComplete="street-address" required />
                    </div>
                </section>
                <div className={style.action_container}>
                    <button type="reset">Cancel</button>
                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Update"}</button>
                </div>
            </form>
        </section>
    )
}
