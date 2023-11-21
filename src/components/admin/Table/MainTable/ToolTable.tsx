"use client"

import styles from './Table.module.scss'

interface thisProps {
  searchValue: string;
  isHaveAdd: boolean;
  title?: string;
  changeText: Function;
  handleAdd?: Function;
}

export default function ToolTable({ searchValue, title, changeText, handleAdd, isHaveAdd }: thisProps) {

  return (
    <section className={styles.tool_table}>
      <div className={styles.search}>
        <input type="text" placeholder="Search Name" title="name"
          onChange={(event) => changeText(event.target.value)} value={searchValue} />
        {/* <Search /> */}S
      </div>
      {isHaveAdd &&
        <div className={styles.add_button} onClick={() => handleAdd!()}>
          {/* <Add /> */}A
          <button>Add {title}</button>
        </div>
      }
    </section>
  )
}
