import style from "./ThreeProductImage.module.scss";

export default function CampaignSkeleton() {
    return (
        <div className={style.row}>
            {[0, 1, 2].map((i) => (
                <div key={i} className={style.card}>
                    <figure>
                        <div className={`${style.frame} ${style.frame_skeleton}`} />
                        <figcaption>
                            <span className={`${style.line_skeleton} ${style.short}`} />
                            <span className={style.line_skeleton} />
                        </figcaption>
                    </figure>
                </div>
            ))}
        </div>
    )
}
