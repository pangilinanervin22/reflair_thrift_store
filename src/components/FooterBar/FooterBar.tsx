import Link from "next/link";
import style from "./FooterBar.module.scss"
import Image from "next/image";

export default function FooterBar() {
    return (
        <>
            <footer className={style.footer}>
                <div className="Column1">
                    <div className={style.footer_flex_row1}>
                        <div className={style.left_column}>
                            <h1>ReFlair</h1>
                            <h4> Unearth the Hidden Flair of Timeless Fashion</h4>
                        </div>

                        <div className={style.right_column}>
                            <h1>Find us on</h1>
                            <ul>
                                <li>
                                    <Link href="/">
                                        <Image
                                            src="/assets/icons/logo-fb.svg"
                                            alt="facebook"
                                            width={1920}
                                            height={1080}
                                        />
                                    </Link>

                                </li>
                                <li>
                                    <Link href="/">
                                        <Image
                                            src="/assets/icons/logo-ig.svg"
                                            alt="ig"
                                            width={1920}
                                            height={1080}
                                        />
                                    </Link>

                                </li>
                                <li>
                                    <Link href="/">
                                        <Image
                                            src="/assets/icons/logo-tiktok.svg"
                                            alt="tiktok"
                                            width={1920}
                                            height={1080}
                                        />
                                    </Link>

                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className={style.footer_flex_row2}>
                        <div className={style.second_column_left}>
                            <Link href="/product/men">Shop Men</Link>
                            <Link href="/product/women">Shop Women</Link>
                            <Link href="/product/shoes">Shop Shoes</Link>
                        </div>

                        <div className={style.second_column_right}>
                            <Link href="/">Checkout</Link>
                            <Link href="/">Account</Link>

                        </div>
                    </div>
                </div>

                <div className="Column2">
                    <div className={style.footer_row3}>
                        <div className={style.row3_top}>
                            <h4>©2022-2023 ReFlair All Rights Reserved.</h4>
                        </div>
                        <div className={style.row3_bottom}>
                            <Link href="/privacy">Privacy Center</Link>
                            <Link href="/terms">Terms and Condition</Link>
                            <Link href="/cookies">Cookie Policy</Link>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}
