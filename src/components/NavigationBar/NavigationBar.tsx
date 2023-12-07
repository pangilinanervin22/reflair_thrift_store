import Image from 'next/image'
import Link from 'next/link'
import style from "./NavigationBar.module.scss"

export default function NavigationBar() {
    return (
        <>
            <nav className={style.nav}>
                <Link href="/"><h1 className={style.logo}>ReFlair</h1></Link>
                <section className={style.section_list}>
                    <div><Link href="/product/women" className={style.nav_link}>WOMEN</Link></div>
                    <div><Link href="/product/men" className={style.nav_link}>MEN</Link></div>
                    <div><Link href="/product/shoes" className={style.nav_link}>SHOES</Link></div>
                </section>
                <section className={style.container_icon}>
                    <div>
                        <Link href="/product">
                            <div className={style.icon}>
                                <Image src={"/assets/icons/search.svg"}
                                    width={1080} height={1080}
                                    alt="search product link" />
                            </div></Link>
                    </div>
                    <div>
                        <Link href="/liked">
                            <div className={style.icon}>
                                <Image src={"/assets/icons/heart.svg"}
                                    width={1080} height={1080}
                                    alt="liked product link" />
                            </div></Link>
                    </div>
                    <div>
                        <Link href="/account">
                            <div className={style.icon}>
                                <Image src={"/assets/icons/profile.svg"}
                                    width={1080} height={1080}
                                    alt="profile link" />
                            </div></Link>
                    </div>
                    <hr className={style.separator} />
                    <div>
                        <Link href="/cart">
                            <div className={style.icon}>
                                <Image src={"/assets/icons/cart.svg"}
                                    width={1080} height={1080}
                                    alt="profile link" />
                            </div>
                        </Link>
                    </div>
                </section>
            </nav>
        </>
    )
}
