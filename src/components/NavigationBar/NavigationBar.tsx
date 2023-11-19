import Image from 'next/image'
import Link from 'next/link'
import style from "./NavigationBar.module.scss"
import ImageWrapper from '../ImageWrapper'


export default function NavigationBar() {
    return (
        <>
            <nav className={style.nav}>
                <h1 className={style.logo}>ReFlair</h1>
                {/* <section className={style.section_list}>
                    <div><Link className={style.nav_link} href="/">HOME</Link></div>
                    <div><Link className={style.nav_link} href="/login">LOGIN CLIENT</Link></div>
                    <div><Link className={style.nav_link} href="/register">REGISTER CLIENT</Link></div>
                    <div><Link className={style.nav_link} href="/admin">Protected Route</Link></div>
                </section> */}

                <section className={style.section_list}>
                    <div><Link href="" className={style.nav_link}>WOMEN</Link></div>
                    <div><Link href="" className={style.nav_link}>MEN</Link></div>
                    <div><Link href="" className={style.nav_link}>SHOES</Link></div>
                </section>

                <section className={style.container_icon}>
                    <div>
                        <Link href="/product">
                            <ImageWrapper styleName={style.icon}>
                                <Image src={"/assets/icons/search.svg"}
                                    width={1080} height={1080}
                                    alt="search product link" />
                            </ImageWrapper></Link>
                    </div>
                    <div>
                        <Link href="/">
                            <ImageWrapper styleName={style.icon}>
                                <Image src={"/assets/icons/heart.svg"}
                                    width={1080} height={1080}
                                    alt="liked product link" />
                            </ImageWrapper></Link>
                    </div>
                    <div>
                        <Link href="/">
                            <ImageWrapper styleName={style.icon}>
                                <Image src={"/assets/icons/profile.svg"}
                                    width={1080} height={1080}
                                    alt="profile link" />
                            </ImageWrapper></Link>
                    </div>
                    <hr className={style.seperator} />
                    <div>
                        <Link href="/">
                            <ImageWrapper styleName={style.icon}>
                                <Image src={"/assets/icons/cart.svg"}
                                    width={1080} height={1080}
                                    alt="profile link" />
                            </ImageWrapper></Link>
                    </div>
                </section>
            </nav>
        </>
    )
}
