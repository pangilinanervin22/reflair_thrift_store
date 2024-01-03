"use client"

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import style from './page.module.scss';
import { CreateAccountAction } from "@/lib/AccountAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/email_validation";
import Image from "next/image";

export default function ClientRegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    if (sessionStatus === "authenticated") {
        console.log(session, "session");
        router.push("/account");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        const loading = toast.loading("Registration is pending");

        try {
            // get form data
            const formData = e.target;
            const name = (formData as any).name.value;
            const email = (formData as any).email.value;
            const password = (formData as any).password.value;
            const confirmPassword = (formData as any).confirmPassword.value;

            // validation here
            if (!validateEmail(email)) {
                toast.update(loading, { render: "Invalid Email!", type: "error", autoClose: 2000, isLoading: false });
                return;
            }
            if (password !== confirmPassword) {
                toast.update(loading, { render: "Passwords do not match!", type: "error", autoClose: 2000, isLoading: false });
                return;
            }

            // action here
            const res = await CreateAccountAction({ name, email, password, });
            if (res?.ok) {
                toast.update(loading, { render: res.message, type: "success", autoClose: 2000, isLoading: false });
                router.push("/login");
            }
            else if (res?.error)
                toast.update(loading, { render: res.message, type: "error", autoClose: 2000, isLoading: false });

        } catch (error) {
            toast.update(loading, { render: 'Error occurred', type: "error", autoClose: 2000, isLoading: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <div className={style.side}>
                {/* Add your image tag or component here */}
                <Image src={"/assets/images/imgRegister.jpg"} alt='wew' width={"800"} height={"1200"} />
            </div>
            <form onSubmit={handleSubmit}>
                <h1>ReFlair</h1>
                <h4> Unearth the Hidden Flair of Timeless Fashion</h4>
                <hr className={style.underline} />
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    required
                />
                <input
                    type="text"
                    id="email"
                    placeholder="Enter Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                />

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Register</button>
                <p>If you already have an account you can login here</p>
                <span onClick={() => router.push("/login")}>Login Here</span>
                <hr className={style.underline} />
            </form>
        </section>
    );
}



