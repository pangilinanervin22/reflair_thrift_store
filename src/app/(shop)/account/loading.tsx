import React from 'react'
import style from './loading.module.scss'

export default function AccountLoading() {
    return (
        <div className={style.account_loading}>
            <div className={style.head}>
                <div className={`${style.title} ${style.skeleton}`} />
                <div className={`${style.count} ${style.skeleton}`} />
            </div>
            {[0, 1, 2].map((i) => (
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
