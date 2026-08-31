import style from "./page.module.scss";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "What the ReFlair demo stores about you, why, and how to have it removed.",
    alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "31 August 2026";

export default function PrivacyPage() {
    return (
        <section className={style.flex_section}>
            <h1>ReFlair Privacy Policy</h1>
            <p className={style.meta}>Last updated {LAST_UPDATED} · Portfolio demo — no real transactions</p>

            <div className={style.block}>
                <h2>1. What ReFlair is</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        ReFlair is a portfolio project: a demonstration storefront for one-of-one, pre-loved
                        fashion pieces, operated from Bacoor, Cavite, Philippines. It is not a trading business.
                        No payments are collected, nothing listed is genuinely for sale, and any order you place
                        is a demonstration only. This policy explains what the demo stores about you and why.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>2. What we collect</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        Only what you type in. Creating an account stores your name, email address and a one-way
                        hash of your password — the password itself is never stored. Completing your delivery
                        details stores a contact number, barangay and street address in Bacoor. Using the shop
                        stores the pieces in your bag, the pieces you save, and the demonstration orders you
                        place, including their status.
                    </p>
                    <p className={style.info}>
                        We do not collect payment details, location data, device fingerprints or behavioural
                        profiles, and we do not run advertising or analytics trackers.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>3. How we use it</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        To run the demo for you: signing you in, keeping your bag and saved pieces between visits,
                        and showing your orders in your account. The same records appear in the admin dashboard
                        that is part of the demonstration. Your data is not sold, rented or shared with third
                        parties for their own purposes.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>4. Where it lives</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        The site is hosted on Vercel, its data is stored in a MongoDB Atlas database, and product
                        images are stored with UploadThing. These providers process data on our behalf under
                        their own terms. Because this is a demonstration, records may be reset or removed at any
                        time without notice.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>5. Cookies</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        ReFlair sets only the cookies needed to keep you signed in. See the{" "}
                        <Link href="/cookies">Cookies Policy</Link> for details.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>6. Your choices</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        You can edit your delivery details from your account at any time, and you can stop using
                        the demo whenever you like. To have an account and its records removed, contact the site
                        owner through the project&apos;s public repository and it will be deleted.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>7. Changes</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        If this policy changes, the date at the top changes with it. Continued use of the demo
                        after a change means you accept the updated policy. Please also read the{" "}
                        <Link href="/terms">Terms of Use</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
