import Link from 'next/link'
import style from "./NavigationBar.module.scss"
import IconSearch_svg from '@/assets/IconSearch_svg'
import IconHeart_svg from '@/assets/IconHeart_svg'
import IconProfile_svg from '@/assets/IconProfile_svg'
import IconCart_svg from '@/assets/IconCart_svg'
import CartCount from './CartCount'

// Static server shell — personalization (the cart count) lives in the
// <CartCount /> client island so pages using this nav can stay static/ISR.
export default function NavigationBar() {
    return (
        <header className={style.header}>
            <p className={style.announce}>
                Curated pre-loved fashion — one of each. Once it’s gone, it’s gone.
            </p>
            <nav className={style.nav}>
                <section className={style.section_list}>
                    <Link href="/product/women" className={style.nav_link}>Women</Link>
                    <Link href="/product/men" className={style.nav_link}>Men</Link>
                    <Link href="/product/shoes" className={style.nav_link}>Shoes</Link>
                    <Link href="/product" className={style.nav_link}>All</Link>
                </section>

                <Link href="/" className={style.logo_link}>
                    <span className={style.logo}>Re<em>Flair</em></span>
                </Link>

                <section className={style.container_icon}>
                    <Link href="/product" aria-label="Search the archive" className={style.icon}>
                        <IconSearch_svg />
                    </Link>
                    <Link href="/account/like" aria-label="Saved items" className={style.icon}>
                        <IconHeart_svg />
                    </Link>
                    <Link href="/account" aria-label="Account" className={style.icon}>
                        <IconProfile_svg />
                    </Link>
                    <span className={style.separator} aria-hidden="true" />
                    <Link href="/account/cart" aria-label="Shopping bag" className={style.icon}>
                        <IconCart_svg />
                        <CartCount />
                    </Link>
                </section>
            </nav>
        </header>
    )
}
