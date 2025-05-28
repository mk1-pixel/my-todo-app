import { styles } from "./Incomplete.module";

export default function Incomplete({
  incomplete,
  onClickComplete,
  onClickDelete,
}) {
  console.log(incomplete)
  return (
    <>
      <div className={styles.incompleteArea}>
        <h1 className={styles.h1}>未完了</h1>
        <div className={styles.listArea}>
          <ul className={styles.listUl}>
            {incomplete.map((task, index) => (
              <li key={index} className={styles.listLi}>
                <span className={styles.listSpan}>{task.title}</span>
                <div className={styles.buttonArea}>
                  <button
                    className={styles.buttonComplete}
                    onClick={() => onClickComplete(task, index)}
                  >
                    完了
                  </button>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => onClickDelete(task.id, index)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
