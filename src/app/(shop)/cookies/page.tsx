import style from "./page.module.scss";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookies Policy",
    description: "The strictly necessary cookies ReFlair sets, and how to manage them.",
    alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "31 August 2026";

export default function CookiesPage() {
    return (
        <section className={style.flex_section}>
            <h1>ReFlair Cookies Policy</h1>
            <p className={style.meta}>Last updated {LAST_UPDATED} · Portfolio demo — no real transactions</p>

            <div className={style.block}>
                <h2>1. Cookies we set</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        ReFlair uses only strictly necessary cookies: a session cookie that keeps you signed in,
                        and short-lived sign-in helper cookies (a security token and a return address) that
                        protect the sign-in form. They are set by the site itself and are not used to follow you
                        across other websites.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>2. Cookies we don&apos;t set</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        There are no advertising cookies, no analytics cookies and no third-party tracking on
                        this site. Because only strictly necessary cookies are used, no consent banner is shown.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>3. Managing cookies</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        Signing out ends your session and clears the session cookie. You can also delete cookies
                        at any time through your browser&apos;s settings — you will simply need to sign in again to
                        use your bag and account. See the <Link href="/privacy">Privacy Policy</Link> for what the
                        demo stores about you.
                    </p>
                </div>
            </div>
        </section>
    );
}
