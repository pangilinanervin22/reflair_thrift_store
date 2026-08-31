"use client"

import React, { useMemo, useState } from "react";
import BodyTable from "./BodyTable";
import ToolTable from "./ToolTable";
import PaginateTable from "./PaginateTable";
import paginate from "./utils/paginate";
import sortPath, { getField, type Row } from "./utils/sortPath";
import styles from "./Table.module.scss";

export type { Row };

export interface TableStructure<T extends Row = Row> {
    /** Field holding the row's unique key */
    id: string;
    title: string;
    /** Field the search box matches against (a string field) */
    searchPath: string;
    defaultSort?: string;
    defaultOrder?: "asc" | "desc";
    structure: Column<T>[];
}

export interface Column<T extends Row = Row> {
    label: string;
    width: string;
    height?: string;
    fontSize?: string;
    /** Field to show and sort by. Combine with `element` for a sortable custom cell. */
    path?: string;
    element?: (row: T) => React.ReactElement;
}

export interface SortColumn {
    path: string;
    ascending: boolean;
}

interface Props<T extends Row> {
    data: T[];
    isEditable: boolean;
    structure: TableStructure<T>;
    handleUpdate: (row: T) => void;
    handleDelete: (row: T) => void;
    handleAdd?: () => void;
}

const PAGE_SIZE = 5;

// Filter → sort → paginate, entirely in memory (the admin tables are small).
export default function MainTable<T extends Row>({ data, isEditable, structure, handleAdd, handleUpdate, handleDelete }: Props<T>) {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<SortColumn>({
        path: structure.defaultSort || structure.searchPath,
        ascending: structure.defaultOrder !== "desc",
    });

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return data;
        return data.filter((row) => String(getField(row, structure.searchPath) ?? "").toLowerCase().includes(query));
    }, [data, searchQuery, structure.searchPath]);

    const sortedData = useMemo(
        () => sortPath(filteredData, sortColumn.path, sortColumn.ascending),
        [filteredData, sortColumn],
    );

    const total = sortedData.length;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(currentPage, pageCount - 1); // clamp when the data shrinks under us
    const paginatedData = useMemo(() => paginate(sortedData, page, PAGE_SIZE), [sortedData, page]);

    return (
        <section className={styles.container_table}>
            <ToolTable
                searchValue={searchQuery}
                changeText={(value) => { setSearchQuery(value); setCurrentPage(0); }}
                title={structure.title}
                handleAdd={handleAdd}
            />

            <BodyTable
                isEditable={isEditable}
                data={paginatedData}
                tableProps={structure}
                sortColumn={sortColumn}
                handleSortColumn={onHandleSortColumn}
                deleteColumn={handleDelete}
                updateColumn={handleUpdate}
            />
            <PaginateTable
                page={page}
                size={PAGE_SIZE}
                currentTotal={paginatedData.length}
                total={total}
                handlePagination={(next) => { if (next >= 0 && next < pageCount) setCurrentPage(next); }}
            />
        </section>
    );

    function onHandleSortColumn(path: string) {
        setSortColumn((current) =>
            current.path === path ? { path, ascending: !current.ascending } : { path, ascending: true },
        );
    }
}
