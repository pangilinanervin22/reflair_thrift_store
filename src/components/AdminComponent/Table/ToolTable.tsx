"use client"

import styles from './Table.module.scss'
import IconSearch_svg from '@/assets/IconSearch_svg';
import IconAdd_svg from '@/assets/IconAdd_svg';

interface Props {
  searchValue: string;
  title?: string;
  changeText: (value: string) => void;
  handleAdd?: () => void;
}

export default function ToolTable({ searchValue, title, changeText, handleAdd }: Props) {
  return (
    <section className={styles.tool_table}>
      <label htmlFor="table-search" className={styles.visually_hidden}>Search by name</label>
      <div className={styles.search}>
        <input
          id="table-search"
          type="search"
          placeholder="Search name"
          onChange={(event) => changeText(event.target.value)}
          value={searchValue}
        />
        <IconSearch_svg />
      </div>
      {handleAdd && (
        <button type="button" className={styles.add_button} onClick={handleAdd}>
          <IconAdd_svg />
          <span>Add {title}</span>
        </button>
      )}
    </section>
  )
}
