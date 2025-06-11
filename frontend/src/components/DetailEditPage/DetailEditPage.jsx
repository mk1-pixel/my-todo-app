import { Link, useLocation } from "react-router-dom";
import { styles } from "./DetailEditPage.module.jsx";
import { useTodoActions } from "../../hooks/useTodoActions.jsx";

export default function DetailEditPage() {
  const location = useLocation();
  const state = location.state;
  const {} = useTodoActions();

  return (
    <>
      <div className={styles.homeOuter}>
        <div className={styles.homeWidthMd}>
          <section className={styles.section}>
            <div className={styles.incompleteArea}>
              <Link
                to="/"
                className="flex justify-start content-center gap-3 border-b border-slate-300 mb-4 pb-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 hover:opacity-50 cursor-pointer transition-all duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
                <div className="w-3/5 md:w-4/5">
                  <label htmlFor="first-name" className={styles.addTodoLabel}>
                    <h1 className={styles.h1}>Title</h1>
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
              </Link>

              <div className={styles.listArea}>
                <div className={styles.listUl}>
                  <div className="flex justify-between">
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>期限日：</span>
                      <div className={styles.detailDate}></div>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>作成日：</span>
                      <div className={styles.detailDate}></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>タグ：</span>
                      <div className={styles.detailDate}>仕事</div>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>優先度：</span>
                      <div className={styles.detailDate}></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-gray-50 py-2 px-2 border-b border-slate-200">
                    <span className={styles.detailTitle}>メモ</span>
                    <div className="relative w-full min-w-[200px]">
                      <textarea className="h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all duration-300 focus:outline-none focus:ring-1"></textarea>
                    </div>
                  </div>
                  <div className={styles.buttonArea}>
                    <button className={styles.buttonComplete}>編集</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
