import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { styles } from "./DetailEditPage.module.jsx";
import { useTodoActions } from "../../hooks/useTodoActions.jsx";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { utils } from "../../utils/utils.jsx";
import "./DetailEditPage.module.css";

export default function DetailEditPage() {
  const today = new Date();
  const navi = useNavigate();
  const { id } = useParams();
  const { detailData, onClickRestore, fetchDetail, setDetailData } =
    useTodoActions();
  const { changeDate } = utils();
  fetchDetail(id);
  const formChange = (e) => {
    const { name, value } = e.target;
    setDetailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const formDateChange = (date) => {
    setDetailData((prev) => ({ ...prev, dueDate: date }));
  };

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
              </Link>

              <div className={styles.listArea}>
                <div className={styles.listUl}>
                  <div className={styles.item}>
                    <span className={styles.detailTitle}>Title：</span>
                    <div className="w-full">
                      <input
                        id="first-name"
                        type="text"
                        name="title"
                        className={styles.addTodoInput}
                        onChange={(e) => formChange(e)}
                        value={detailData.title}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>期限日：</span>
                      <div className={styles.detailDate}></div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="relative -right-5" />
                        <DatePicker
                          name="dueDate"
                          locale={ja}
                          selected={detailData.dueDate || null}
                          placeholderText=""
                          onChange={(date) => formDateChange(date)}
                          dateFormat="yyyy/MM/dd"
                          dateFormatCalendar="yyyy年 MM月"
                          minDate={today}
                          className=" text-base align-middle border border-gray-300 rounded-md shadow pl-6 pr-3 py-2 w-full"
                        />
                      </div>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.detailTitle}>作成日：</span>
                      <div className={styles.detailDate}>
                        {changeDate(detailData.createdDate)}
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
                      <div className={styles.detailDate}></div>
                      <select
                        name="priority"
                        value={detailData.priority}
                        onChange={(e) => formChange(e)}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 cursor-pointer text-sm font-bold rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="0">高</option>
                        <option value="1">中</option>
                        <option value="2">低</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-gray-50 py-2 px-2 border-b border-slate-200">
                    <span className={styles.detailTitle}>メモ</span>
                    <div className="relative w-full min-w-[200px]">
                      <textarea
                        name="description"
                        defaultValue={detailData.description}
                        onChange={(e) => formChange(e)}
                        className="h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all duration-300 focus:outline-none focus:ring-1"
                      ></textarea>
                    </div>
                  </div>
                  <div className={styles.buttonArea}>
                    <button
                      onClick={() => navi(-1)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition duration-300"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={(e) => onClickRestore(e, id)}
                      className={styles.buttonComplete}
                    >
                      保存
                    </button>
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
