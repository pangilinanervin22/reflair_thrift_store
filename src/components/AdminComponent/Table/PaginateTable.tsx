"use client"

import IconArrowLeft_svg from '@/assets/IconArrowLeft_svg';
import IconArrowRight_svg from '@/assets/IconArrowRight_svg';
import styles from './Table.module.scss'

interface Props {
    size: number;
    page: number;
    total: number;
    currentTotal: number;
    handlePagination: (page: number) => void;
}

export default function PaginateTable({ page, size, total, currentTotal, handlePagination }: Props) {
    const pageStart = total === 0 ? 0 : page * size + 1;
    const pageEnd = page * size + currentTotal;
    const canPrev = page > 0;
    const canNext = pageEnd < total;

    return (
        <section className={styles.paginate_table}>
            <p>{pageStart + "-" + pageEnd + " of " + total}</p>
            <button type="button" className={styles.page_button} disabled={!canPrev} onClick={() => handlePagination(page - 1)} aria-label="Previous page">
                <IconArrowLeft_svg />
            </button>
            <button type="button" className={styles.page_button} disabled={!canNext} onClick={() => handlePagination(page + 1)} aria-label="Next page">
                <IconArrowRight_svg />
            </button>
        </section>
    )
}
