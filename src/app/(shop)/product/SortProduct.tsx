'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import style from './SortPorduct.module.scss'

export default function SortPage() {
    const [search, setSearch] = React.useState('');
    const [sort, setSort] = React.useState('');
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);

    const params = useSearchParams();
    console.log(params, 'params', params.get('sort'));

    const router = useRouter();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sort = e.target.value;
        setSort(sort);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        setDebounceTimer(setTimeout(() => {
            setSearch(search);
        }, 500));
    }


    React.useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (sort) params.append('sort', sort);
        const url = `?${params.toString()}`;
        router.push("product" + url);
    }, [search, sort, router]);

    return (
        <div className={style.sort_product}>
            <div>
                <label>Search: </label>
                <input type="text" onChange={handleSearchChange} />
            </div>
            <select onChange={handleSortChange}>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="name_asc">Name (A to Z)</option>
                <option value="name_desc">Name (Z to A)</option>
            </select>
        </div>
    )
}
