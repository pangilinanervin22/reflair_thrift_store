import style from './loading.module.scss'

// Shared loading skeleton for the account pages (profile, bag, saved, checkout, orders).
export default function AccountSkeleton({ rows = 3, showHead = true }: { rows?: number; showHead?: boolean }) {
    return (
        <div className={style.account_loading}>
            {showHead && (
                <div className={style.head}>
                    <div className={`${style.title} ${style.skeleton}`} />
                    <div className={`${style.count} ${style.skeleton}`} />
                </div>
            )}
            {Array.from({ length: rows }).map((_, i) => (
                <div className={style.row} key={i}>
                    <div className={`${style.thumb} ${style.skeleton}`} />
                    <div className={style.lines}>
                        <div className={style.skeleton} />
                        <div className={style.skeleton} />
                    </div>
                    <div className={`${style.price} ${style.skeleton}`} />
                </div>
            ))}
        </div>
    )
}
