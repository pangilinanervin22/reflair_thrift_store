"use client"

import type { Column, SortColumn, TableStructure, Row } from "./TableStructure";
import { getField } from "./utils/sortPath";
import styles from './Table.module.scss'
import IconArrowUp_svg from "@/assets/IconArrowUp_svg";
import IconArrowDown_svg from "@/assets/IconArrowDown_svg";

interface Props<T extends Row> {
    data: T[];
    tableProps: TableStructure<T>;
    sortColumn: SortColumn;
    isEditable: boolean;
    handleSortColumn: (path: string) => void;
    updateColumn: (row: T) => void;
    deleteColumn: (row: T) => void;
}

export default function BodyTable<T extends Row>({
    data,
    tableProps,
    sortColumn,
    handleSortColumn,
    deleteColumn,
    updateColumn,
    isEditable
}: Props<T>) {
    const columnCount = tableProps.structure.length + (isEditable ? 2 : 0);

    return (
        <table>
            <thead>
                <tr>
                    {tableProps.structure.map((column) => renderCellHeader(column))}
                    {isEditable &&
                        <>
                            <th style={{ width: "110px" }}>Update</th>
                            <th style={{ width: "110px" }}>Delete</th>
                        </>
                    }
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columnCount} className={styles.empty}>No data</td>
                    </tr>
                ) : data.map((row) => (
                    <tr key={String(getField(row, tableProps.id))}>
                        {tableProps.structure.map((column) => (
                            <td key={column.label} style={{ width: column.width, fontSize: column.fontSize, height: column.height }}>
                                {column.element ? column.element(row) : renderValue(column.path ? getField(row, column.path) : undefined)}
                            </td>
                        ))}
                        {isEditable &&
                            <>
                                <td style={{ width: "110px" }}>
                                    <button type="button" className={styles.button_update} onClick={() => updateColumn(row)}>
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: "110px" }}>
                                    <button type="button" className={styles.button_delete} onClick={() => deleteColumn(row)}>
                                        Delete
                                    </button>
                                </td>
                            </>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )

    function renderValue(value: unknown): React.ReactNode {
        if (value === null || value === undefined) return "—";
        if (value instanceof Date) return value.toLocaleDateString();
        return String(value);
    }

    function renderCellHeader(column: Column<T>) {
        if (!column.path)
            return <th key={column.label} style={{ width: column.width }}>{column.label}</th>;

        const path = column.path;
        const active = sortColumn.path === path;
        return (
            <th key={column.label} style={{ width: column.width }} aria-sort={active ? (sortColumn.ascending ? "ascending" : "descending") : "none"}>
                <button type="button" className={styles.sort_button} onClick={() => handleSortColumn(path)}>
                    {column.label}
                    {active && (
                        <span className={styles.arrow_keys} aria-hidden="true">
                            {sortColumn.ascending ? <IconArrowUp_svg /> : <IconArrowDown_svg />}
                        </span>
                    )}
                </button>
            </th>
        );
    }
}
