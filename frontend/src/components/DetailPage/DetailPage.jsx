import { useLocation } from "react-router-dom";
import { styles } from "./DetailPage.module";

export default function DetailPage() {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  return (
    <>
      <div className={styles.homeOuter}>
        <div className={styles.homeWidthMd}>
          <section className={styles.section}>
            <div className={styles.incompleteArea}>
              <div className="flex justify-start content-center gap-2 border-b border-slate-300 mb-4 pb-1">
                <h1 className={styles.h1}>{state.title}</h1>
                <div className="flex items-center gap-x-3"></div>
              </div>

              <div className={styles.listArea}>
                <div className={styles.listUl}>
                  <div className={styles.item}>
                    <span className={styles.detailTitle}>作成日：</span>
                    <div className={styles.detailDate}>2025/07/22</div>
                  </div>
                  <div className="flex flex-col gap-2 border-gray-50 py-2 px-2 border-b border-slate-200">
                    <span className={styles.detailTitle}>メモ</span>
                    <div className="relative w-full min-w-[200px]">
                      <textarea
                        className="h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all duration-300 focus:outline-none focus:ring-1"
                      ></textarea>
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
