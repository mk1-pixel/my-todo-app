import TodoListHeader from "../TodoListHeader/TodoListHeader";
import { styles } from "./TodoList.module";

export default function Incomplete({
  incomplete,
  complete,
  onClickComplete,
  onClickDelete,
  onClickBack,
  changeDisplay,
  handleState,
  loading,
}) {
  return (
    <>
      <div className={styles.incompleteArea}>
        <TodoListHeader
          handleState={handleState}
          changeDisplay={changeDisplay}
        />
        <div className={styles.listArea}>
          <ul className={styles.listUl}>
            {loading ? (
              <div className="animate-pulse bg-gray-50 w-full h-screen absolute -top-px -left-px right-full bottom-full flex justify-center items-center">
                <div className="animate-pulse" aria-label="読み込み中">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              </div>
            ) : changeDisplay ? (
              incomplete.map((task, index) => (
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
              ))
            ) : (
              complete.map((task, index) => (
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
      </div>
    </>
  );
}
