import React from 'react'
import style from './loading.module.scss'

export default function ShopLoading() {
    return (
        <div className={style.brand_loading}>
            <p className={style.eyebrow}>The Archive</p>
            <h1 className={style.wordmark}>Re<em>Flair</em></h1>
            <span className={style.rule} aria-hidden="true" />
        </div>
    )
}
