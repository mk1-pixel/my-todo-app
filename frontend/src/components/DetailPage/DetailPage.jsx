import { Link, useLocation, useParams } from "react-router-dom";
import { styles } from "./DetailPage.module";
import { useTodoActions } from "../../hooks/useTodoActions.jsx";
import { utils } from "../../utils/utils.jsx";

export default function DetailPage() {
  const location = useLocation();
  const state = location.state;
  const {
    onClickDelete,
    fetchDetail,
    detailData,
    onClickComplete,
  } = useTodoActions();
  const { id } = useParams();
  const { changeDate } = utils();
  fetchDetail(id);

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
                <h1 className={styles.h1}>{detailData.title}</h1>
              </Link>

              <div className={styles.listArea}>
                <div className={styles.listUl}>
                  <div className="flex justify-between">
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>期限日：</span>
                      <div className={styles.detailDate}>
                        { changeDate(detailData.dueDate)}
                      </div>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>作成日：</span>
                      <div className={styles.detailDate}>
                        { changeDate(detailData.createdDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>タグ：</span>
                      <div className={styles.detailDate}>仕事</div>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>優先度：</span>
                      <div className={styles.detailDate}>
                        {detailData.priority === 0 ? "高" : detailData.priority === 1 ? "中" : "低"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-gray-50 py-2 px-2 border-b border-slate-200">
                    <span className={styles.detailTitle}>メモ</span>
                    <div className="relative w-full min-w-[200px] min-h-[150px] text-base break-words whitespace-normal border border-gray-300 shadow rounded p-2 ">
                        {detailData.description}
                    </div>
                  </div>
                  <div className={styles.buttonArea}>
                    <div className="flex gap-2">
                      <Link to="edit" state={{ id: id }}>
                        <button className={styles.buttonEdit}>編集</button>
                      </Link>
                      <button
                        className={styles.buttonDelete}
                        onClick={() => onClickDelete(state.id, state.index)}
                      >
                        削除
                      </button>
                    </div>
                    <div className="">
                      <button
                        className={styles.buttonComplete}
                        onClick={(e) => onClickComplete(e, id)}
                      >
                        完了
                      </button>
                    </div>
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
