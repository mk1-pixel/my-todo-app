import StateButton from "../StateButton/StateButton";
import { styles } from "./Incomplete.module";

export default function Incomplete({
  incomplete,
  onClickComplete,
  onClickDelete,
  changeDisplay,
  handleState
}) {
  return (
    <>
      <div className={styles.incompleteArea}>
        <div className="flex justify-start content-center gap-2 border-b border-slate-300 mb-4 pb-1">
          <h1 className={styles.h1}>{(changeDisplay) ? "未完了" : "完了"}</h1>
          <StateButton handleState={handleState}/>
        </div>
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
