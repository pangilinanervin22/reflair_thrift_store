import Link from "next/link";
import style from "./FooterBar.module.scss"

export default function FooterBar() {
    return (
        <footer className={style.footer}>
            <div className={style.top}>
                <div className={style.brand}>
                    <p className={style.eyebrow}>ReFlair — Est. 2022</p>
                    <h2 className={style.tagline}>
                        Unearth the hidden <em>flair</em> of timeless fashion.
                    </h2>
                </div>

                <nav className={style.columns}>
                    <div className={style.column}>
                        <h3>Shop</h3>
                        <Link href="/product/women">Women</Link>
                        <Link href="/product/men">Men</Link>
                        <Link href="/product/shoes">Shoes</Link>
                        <Link href="/product">All pieces</Link>
                    </div>
                    <div className={style.column}>
                        <h3>Account</h3>
                        <Link href="/account">Profile</Link>
                        <Link href="/account/order">Orders</Link>
                        <Link href="/account/cart">Bag</Link>
                        <Link href="/account/like">Saved</Link>
                    </div>
                    <div className={style.column}>
                        <h3>Follow</h3>
                        <a href="https://web.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">TikTok</a>
                    </div>
                </nav>
            </div>

            <div className={style.wordmark} aria-hidden="true">
                Re<em>Flair</em>
            </div>

            <div className={style.legal}>
                <p>©2022–{new Date().getFullYear()} ReFlair. All rights reserved.</p>
                <div className={style.legal_links}>
                    <Link href="/privacy">Privacy Center</Link>
                    <Link href="/terms">Terms &amp; Conditions</Link>
                    <Link href="/cookies">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    )
}
