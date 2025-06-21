import { useState } from "react";
import { styles } from "./AddTodo.module";

export default function AddTodo({ inputTodo, setInputTodo, onClickAdd }) {
  const [caution, setCaution] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.length >= 20) {
      setCaution(true);
      setDisabled(true)
      return;
    } else {
      setCaution(false);
      setDisabled(false)

    }
    setInputTodo(e.target.value);
  };

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
              className={styles.addTodoButton +`${disabled ? " cursor-not-allowed" : null}`}
              disabled={disabled}
            >
              追加
            </button>
          </div>
          {caution ? (
            <p className="text-red-500 text-sm mt-1">
              20文字以内で入力してください。
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
