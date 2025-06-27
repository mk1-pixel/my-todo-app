import { useState } from "react";
import { styles } from "./TagItem.module.jsx";
import { useTags } from "../../context/TagContext.jsx";
import { Tag } from "../Tag/Tag.jsx";

export function TagItem({}) {
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useTags();

  const addTags = (inputTag) => {
    if (tags.length >= 3) return;
    const newTags = [...tags, inputTag];
    setTags(newTags);
  };

  const deleteTags = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const changeAddTag = (e) => {
    const tag = e.target.value;
    if (tag.length >= 20) return;
    setInputTag(tag);
  };

  return (
    <>
      <div className={styles.TagItem}>
        <div className="flex gap-2">
          <span className={styles.detailTitleCol}>タグ：</span>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <>
              <Tag />
                <span
                  id="badge-dismiss-dark"
                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-sm dark:bg-gray-700 dark:text-gray-300"
                  key={index}

                >
                    {tag}
                  <button
                    type="button"
                    className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-xs hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                    data-dismiss-target="#badge-dismiss-dark"
                    aria-label="Remove"
                    key={index}
                    onClick={() => deleteTags(index)}
                  >
                    <svg
                      className="w-2 h-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Remove badge</span>
                  </button>
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="w-9/12 max-w-sm min-w-[150px]">
          <div className="relative">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder=""
              value={inputTag}
              onChange={changeAddTag}
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-1 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => addTags(inputTag)}
            >
              add
            </button>
          </div>
        </div>
        {tags.length >= 3 ? (
          <div className="font-bold text-red-500">
            タグの追加は3つまででお願いします。
          </div>
        ) : null}
      </div>
    </>
  );
}
