import { styles } from "./TodoListHeader.module";

export default function TodoListHeader({handleState, changeDisplay}) {
  return (
    <>
      <div className="flex justify-start content-center gap-2 border-b border-slate-300 mb-4 pb-1">
        <h1 className={styles.h1}>{changeDisplay ? "未完了" : "完了"}</h1>
        <div className="flex items-center gap-x-3">
          <label
            htmlFor="hs-sm-switch"
            className="relative inline-block w-11 h-6 cursor-pointer"
            >
            <input type="checkbox" id="hs-sm-switch" className="peer sr-only" onClick={() => handleState()}/>
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out dark:bg-neutral-700"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-white"></span>
          </label>
        </div>
      </div>
    </>
  );
}
