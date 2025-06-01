import { styles } from "./AddTodo.module";

export default function AddTodo({ inputTodo, handleChange, onClickAdd }) {
  return (
    <>
      <div className={styles.todoAppArea}>
        <h1 className={styles.h1}>TODOアプリ</h1>
        <div>
          <div className={styles.addTodoArea}>
            <div className="w-3/5 md:w-4/5">
              <label htmlFor="first-name" className={styles.addTodoLabel}>
                TODOを追加
              </label>
              <input
                id="first-name"
                type="text"
                className={styles.addTodoInput}
                value={inputTodo}
                onChange={handleChange}
                placeholder="読書をする。"
              />
            </div>
            <button
              onClick={() => onClickAdd(inputTodo)}
              className={styles.addTodoButton}
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
