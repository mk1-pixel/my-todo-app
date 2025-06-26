import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { styles } from "./TodoListItems.module";
import { utils } from "../../utils/utils";

export function TodoListItems({
  currentItems,
  changeDisplay,
  onClickBack,
  loading,
}) {
  const { changeDate } = utils();
  const calcDate = (task) => {
    const duedate = new Date(task.dueDate);
    const now = new Date();
    const today = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  };

  return (
    <>
      <div className={styles.listArea}>
        <ul className={styles.listUl}>
          {changeDisplay ? 
          <li className={styles.listLi}>
            <div className="basis-15/20 text-left font-bold">Todo</div>
            <div className="basis-4/20 text-left font-bold">期限日</div>
            <div className="basis-1/20 text-left font-bold">重要度</div>
          </li>
          : <li className={styles.listLi}>
            <div className="basis-15/20 text-left font-bold">Todo</div>
          </li>}
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
