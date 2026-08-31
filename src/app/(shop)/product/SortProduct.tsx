'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import style from './SortPorduct.module.scss'

export default function SortProduct() {
    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [search, setSearch] = React.useState(params.get('search') ?? '');
    const [sort, setSort] = React.useState(params.get('sort') ?? '');
    const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => setSearch(value), 500);
    };

    React.useEffect(() => () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
    }, []);

    React.useEffect(() => {
        // Preserve unrelated filters (category, material, color) in the URL
        const next = new URLSearchParams(params.toString());
        if (search) next.set('search', search); else next.delete('search');
        if (sort) next.set('sort', sort); else next.delete('sort');
        // A new search or sort starts again from the first page
        if (search !== (params.get('search') ?? '') || sort !== (params.get('sort') ?? '')) next.delete('page');

        const nextQuery = next.toString();
        // Nothing changed — skip the navigation so mounting doesn't trigger
        // a second, redundant server render of the page.
        if (nextQuery === params.toString()) return;

        router.replace(nextQuery ? pathname + '?' + nextQuery : pathname);
    }, [search, sort, router, params, pathname]);

    return (
        <div className={style.sort_product}>
            <div className={style.search_field}>
                <label htmlFor="archive-search">Search</label>
                <input
                    id="archive-search"
                    type="search"
                    placeholder="Search the archive…"
                    defaultValue={search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={style.sort_field}>
                <label htmlFor="archive-sort">Sort</label>
                <select id="archive-sort" defaultValue={sort} onChange={handleSortChange}>
                    <option value="">Featured</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="name_asc">Name (A to Z)</option>
                    <option value="name_desc">Name (Z to A)</option>
                </select>
            </div>
        </div>
    )
}
