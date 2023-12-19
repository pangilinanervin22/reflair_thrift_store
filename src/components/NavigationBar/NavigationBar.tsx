import Image from 'next/image'
import Link from 'next/link'
import style from "./NavigationBar.module.scss"
import IconSearch_svg from '@/assets/IconSearch_svg'
import IconHeart_svg from '@/assets/IconHeart_svg'
import IconProfile_svg from '@/assets/IconProfile_svg'
import IconCart_svg from '@/assets/IconCart_svg'

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
                                <IconSearch_svg />
                            </div></Link>
                    </div>
                    <div>
                        <Link href="/like">
                            <div className={style.icon}>
                                <IconHeart_svg />
                            </div></Link>
                    </div>
                    <div>
                        <Link href="/account">
                            <div className={style.icon}>
                                <IconProfile_svg />
                            </div></Link>
                    </div>
                    <hr className={style.separator} />
                    <div>
                        <Link href="/cart">
                            <div className={style.icon}>
                                <IconCart_svg />
                            </div>
                        </Link>
                    </div>
                </section>
            </nav>
        </>
    )
}
