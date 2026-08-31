import Link from "next/link";
import style from "@/components/ErrorState/ErrorState.module.scss";

export default function ProductNotFound() {
    return (
        <div className={style.wrapper}>
            <p className={style.eyebrow}>ReFlair Atelier</p>
            <h1 className={style.title}>No such piece in the archive.</h1>
            <p className={style.note}>It may have been deleted, or the link is wrong.</p>
            <div className={style.actions}>
                <Link href="/admin/product" className={style.link}>Back to products</Link>
            </div>
        </div>
    );
}
