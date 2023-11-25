"use client"

import { Column, sortColumnProps, TableStructure } from "./TableStructure";
import styles from './Table.module.scss'
import IconArrowUp_svg from "@/assets/IconArrowUp_svg";
import IconArrowDown_svg from "@/assets/IconArrowDown_svg";

interface thisProps {
    data: any[];
    tableProps: TableStructure;
    sortColumn: sortColumnProps;
    isEditable: boolean;
    handleSortColumn: Function;
    updateColumn: Function;
    deleteColumn: Function;
}

export default function BodyTable({
    data,
    tableProps,
    sortColumn,
    handleSortColumn,
    deleteColumn,
    updateColumn,
    isEditable
}: thisProps) {
    return (
        <table>
            <thead>
                <tr>
                    {tableProps.structure.map((curBase: Column) => renderCellHeader(curBase, sortColumn))}
                    {isEditable &&
                        <>
                            <th style={{ width: "110px", fontSize: "20px" }}>UPDATE</th>
                            <th style={{ width: "110px", fontSize: "20px" }}>DELETE</th>
                        </>
                    }
                </tr>
            </thead >
            <tbody>
                {data.length == 0 ? <h1>{"No data"}</h1> : data.map((curData) => (
                    <tr key={curData[tableProps.id]} >
                        {tableProps.structure.map((curBase: Column) => (
                            <td key={curBase.label} style={{ width: curBase.width, fontSize: curBase.fontSize, height: curBase.height }}  >
                                {curBase.element ? curBase.element!(curData) : curData[curBase.path!]}
                            </td>
                        ))}
                        {isEditable &&
                            <>
                                <td key={"edit"} style={{ width: "110px", fontSize: "20px" }}  >
                                    <button className={styles.button_update} onClick={() => updateColumn(curData)}>
                                        EDIT
                                    </button>
                                </td>
                                <td key={"delete"} style={{ width: "110px", fontSize: "20px" }}  >
                                    <button className={styles.button_delete} onClick={() => {
                                        deleteColumn(curData);
                                    }}>
                                        DELETE
                                    </button>
                                </td>
                            </>
                        }
                    </tr>
                ))}
            </tbody >
        </table>
    )

    function renderCellHeader(column: Column, currentSort: sortColumnProps) {
        if (!column.path)
            return <th key={column.label} style={{ width: column.width }} > {column.label} </th>

        return <th key={column.label} style={{ width: column.width }}
            onClick={() => { handleSortColumn(column.path, currentSort.order); }} >
            {column.label} {currentSort.path == column.path && renderIcon(currentSort.order)}
        </th>
    }

    function renderIcon(isAscending: boolean) {
        return isAscending ?
            <div className={styles.arrow_keys}>
                <IconArrowUp_svg />
            </div>
            :
            <div className={styles.arrow_keys} >
                <IconArrowDown_svg />
            </div>
    }

}
