import { Link } from "react-router-dom";
import { useTodoActions } from "../../hooks/useTodoActions";
import Loading from "../Loading/Loading";
import { styles } from "./TodoListItems.module";

export function TodoListItems({ currentItems,changeDisplay }) {
  const {onClickBack, loading} = useTodoActions()
  
  return (
    <>
      <div className={styles.listArea}>
        <ul className={styles.listUl}>
          {loading ? (
            <Loading />
          ) : changeDisplay ? (
            currentItems &&
            currentItems.map((task, index) => (
              <Link
                to={`detail/${task.id}`}
                key={index}
                state={{ id: task.id, index: index, title: task.title }}
              >
                <li key={index} className={styles.listLi}>
                  <span className={styles.listSpan}>{task.title}</span>
                  <div className={styles.buttonArea}></div>
                </li>
              </Link>
            ))
          ) : (
            currentItems &&
            currentItems.map((task, index) => (
              <li key={index} className={styles.completeLi}>
                <span className={styles.completeSpan}>{task.title}</span>
                <div className={styles.completeButtonArea}>
                  <button
                    className={styles.completeButtonBack}
                    onClick={() => onClickBack(task, index)}
                  >
                    戻す
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
