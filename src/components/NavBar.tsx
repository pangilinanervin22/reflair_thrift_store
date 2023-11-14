import Image from 'next/image'
import Link from 'next/link'
import style from "./Navbar.module.scss"


export default function NavBar() {
    return (
        <>
            <nav className={style.nav}>
                {/* <h1 className={style.logo}>ReFlair</h1> */}
                <section className={style.section_list}>
                    <div><Link className={style.nav_link} href="/">HOME</Link></div>
                    <div><Link className={style.nav_link} href="/login">LOGIN CLIENT</Link></div>
                    <div><Link className={style.nav_link} href="/register">REGISTER CLIENT</Link></div>
                    <div><Link className={style.nav_link} href="/admin">Protected Route</Link></div>
                </section>
                {/* 
                 <section className={style.section_list}>
                    <div><Link href="" className={style.nav_link}>WOMEN</Link></div>
                    <div><Link href="" className={style.nav_link}>MEN</Link></div>
                    <div><Link href="" className={style.nav_link}>SHOES</Link></div>
                </section> */}
                {/* <section className={style.icons}>
                    <div><a href="">H</a></div>
                    <div><a href="">B</a></div>
                    <div><a href="">D</a></div>
                    <div><a href="">T</a></div>
                </section> */}
            </nav>
        </>
    )
}
