import style from "./DemoBadge.module.scss";

// Fixed corner notice for the portfolio demo. pointer-events are off so it
// never blocks a tap; the aria-label reads as one sentence for screen readers.
export default function DemoBadge() {
    return (
        <div
            className={style.badge}
            role="note"
            aria-label="Demo notice: This is a demo sample. Items are not for sale. For learning only."
        >
            Demo Sample · Items Not For Sale · For Learning Only
        </div>
    );
}
