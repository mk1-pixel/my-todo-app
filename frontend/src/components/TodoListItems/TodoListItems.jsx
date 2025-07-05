import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { styles } from "./TodoListItems.module";
import { utils } from "../../utils/utils";

export function TodoListItems({
  currentItems,
  changeDisplay,
  onClickBack,
  loading,
  SortDueDate,
  SortImportant,
  setSortDueDate,
  setSortImportant,
}) {
  const { changeDate } = utils();

  return (
    <>
      <div className={styles.listArea}>
        <ul className={styles.listUl}>
          {changeDisplay ? (
            <li className={styles.listLi}>
              <div className="flex justify-items-center items-center basis-15/20 text-left font-bold">
                Todo
              </div>

              <div className="flex justify-items-center items-center basis-4/20 text-left font-bold">
                期限日{" "}
                {SortDueDate ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setSortDueDate(!SortDueDate)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => setSortDueDate(!SortDueDate)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex justify-items-center items-center basis-1/20 text-left font-bold">
                重要度{" "}
                {SortImportant ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setSortImportant(!SortImportant)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => setSortImportant(!SortImportant)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li className={styles.listLi}>
              <div className="basis-15/20 text-left font-bold">Todo</div>
            </li>
          )}
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
                  <div className="max-[450px]:basis-4/20 basis-4/20 text-left text-base bold">
                    {changeDate(task.dueDate)}
                  </div>
                  <div
                    className={
                      task.priority === 2
                        ? "max-[450px]:basis-3/20 basis-1/20 shrink-0 text-center text-white border-grey content-center bold rounded bg-blue-400"
                        : task.priority === 1
                        ? "max-[450px]:basis-3/20 basis-1/20 shrink-0 text-center text-white border-grey content-center bold rounded bg-yellow-400"
                        : task.priority === 0
                        ? "max-[450px]:basis-3/20 basis-1/20 shrink-0 text-center text-white border-grey content-center bold rounded bg-red-400"
                        : null
                    }
                  >
                    {task.priority === 2
                      ? "低"
                      : task.priority === 1
                      ? "中"
                      : task.priority === 0
                      ? "高"
                      : null}
                  </div>
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
