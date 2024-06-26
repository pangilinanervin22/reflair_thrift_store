

import Link from 'next/link'
import style from "./NavigationBar.module.scss"
import IconSearch_svg from '@/assets/IconSearch_svg'
import IconHeart_svg from '@/assets/IconHeart_svg'
import IconProfile_svg from '@/assets/IconProfile_svg'
import IconCart_svg from '@/assets/IconCart_svg'
import { getServerSession } from 'next-auth'
import { Playfair_Display } from 'next/font/google'

const font = Playfair_Display({
    display: 'swap',
    weight: "400",
    subsets: ['latin'],
});

export default async function NavigationBar() {
    const session = await getServerSession();
    const email = session ? session.user.email : "";
    let count = "";

    if (email) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cart/`,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                next: { tags: ["cart"] },
                cache: "no-cache",
            }
        );

        const data = await response.json();
        count = data.count;
    }

    return (
        <>
            <nav className={style.nav}>
                <Link href="/"><h1 className={`${style.logo} ${font.className}`}>ReFlair</h1></Link>
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
                        <Link href="/account/like">
                            <div className={style.icon}>
                                <IconHeart_svg />
                            </div></Link>
                    </div>
                    <div>
                        <Link href="/account">
                            <div className={style.icon}>
                                <IconProfile_svg />
                            </div>
                        </Link>
                    </div>
                    <hr className={style.separator} />
                    <div>
                        <Link href="/account/cart">
                            <div className={style.icon}>
                                <IconCart_svg />
                                <span>
                                    {count}
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>
            </nav>
        </>
    )
}
