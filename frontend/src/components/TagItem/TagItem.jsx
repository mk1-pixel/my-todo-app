import { useState } from "react";
import { styles } from "./TagItem.module.jsx";
import { useTags } from "../../context/TagContext.jsx";
import { Tags } from "../Tags/Tags.jsx";

export function TagItem({}) {
  const [inputTag, setInputTag] = useState("");
  const { tags, setTags } = useTags();

  const addTags = (inputTag) => {
    if (tags.length >= 3 || inputTag === "") return;
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
              <Tags tag={tag} key={index} deleteTags={() => deleteTags(index)} />
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
