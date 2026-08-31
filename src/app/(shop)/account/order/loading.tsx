import style from './page.module.scss'
import AccountSkeleton from '../AccountSkeleton'

export default function OrderLoading() {
    return (
        <div className={style.main_container}>
            <header className={style.head}>
                <h1>Orders</h1>
            </header>
            <AccountSkeleton showHead={false} rows={3} />
        </div>
    )
}
