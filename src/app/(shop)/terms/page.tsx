import style from "./page.module.scss";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Use",
    description: "The terms for using the ReFlair demonstration storefront — nothing is for sale.",
    alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "31 August 2026";

export default function TermsPage() {
    return (
        <section className={style.flex_section}>
            <h1>ReFlair Terms of Use</h1>
            <p className={style.meta}>Last updated {LAST_UPDATED} · Portfolio demo — no real transactions</p>

            <div className={style.block}>
                <h2>1. About these terms</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        ReFlair is a portfolio project demonstrating a storefront for one-of-one, pre-loved
                        fashion pieces. By browsing the site or creating an account you agree to these terms.
                        If you do not agree, please do not use the site.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>2. Nothing is for sale</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        Every listing, price, stock count and order on ReFlair exists to demonstrate the
                        software. Placing an order does not form a contract of sale: no payment is requested or
                        taken, nothing is dispatched, and the flat delivery fee shown at checkout is
                        illustrative. Please do not enter real payment information anywhere on this site — it is
                        never asked for.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>3. Accounts</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        You may create an account with an email address you control. Keep your password private
                        and choose one you do not use elsewhere; treat every account here as a test account.
                        Demonstration accounts and their data may be removed at any time without notice.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>4. How the demo works</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        Each piece is unique: it can sit in one bag and belong to one order at a time, and it
                        leaves the storefront once ordered. You can cancel an order from your account while it
                        is still pending. The site&apos;s administrator may change order statuses to demonstrate
                        the fulfilment flow.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>5. Acceptable use</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        Please use the demo as a shopper would. Do not attempt to access other people&apos;s
                        accounts or data, interfere with or overload the service, upload unlawful or harmful
                        content, or use it for anything other than personal, non-commercial evaluation.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>6. Content and intellectual property</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        The ReFlair name, design and code are the work of the project&apos;s author. Product
                        photographs are used for demonstration only and remain the property of their respective
                        owners. Nothing on the site grants you a licence to reuse its content beyond viewing it
                        in your browser.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>7. No warranty</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        The site is provided as is, as a demonstration, without warranties of any kind. To the
                        fullest extent permitted by law, the author is not liable for any loss arising from your
                        use of it.
                    </p>
                </div>
            </div>

            <div className={style.block}>
                <h2>8. Changes</h2>
                <div className={style.flex_info}>
                    <p className={style.info}>
                        These terms may be updated from time to time; the date at the top reflects the current
                        version. Continued use after a change means you accept the updated terms. See also the{" "}
                        <Link href="/privacy">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
