import Link from "next/link"
import style from "./NotFound.module.scss"

// Shared 404 body. app/not-found.tsx (unknown URLs) wraps it in the shop
// chrome; (shop)/not-found.tsx (notFound() from a shop page) inherits the layout.
export default function NotFoundContent() {
    return (
        <div className={style.wrapper}>
            <p className={style.eyebrow}>ReFlair · Lost in the archive</p>
            <h1 className={style.code}>4<em>0</em>4</h1>
            <p className={style.note}>This piece has already found a new home.</p>
            <Link href="/" className={style.home}>Return to the store</Link>
        </div>
    )
}
