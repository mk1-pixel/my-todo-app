import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "../AddTodo/AddTodo.jsx";
import TodoList from "../TodoList/TodoList.jsx";
import { styles } from "./Home.module.jsx";
import { useTodoActions } from "../../hooks/useTodoActions.jsx";

export default function Home() {
  const {
    inputTodo,
    incomplete,
    complete,
    changeDisplay,
    loading,
    handleState,
    setInputTodo,
    onClickAdd,
    onClickComplete,
    onClickDelete,
    onClickBack,
    setIncomplete
} = useTodoActions();

  return (
    <>
      <div className={styles.homeOuter}>
        <div className={styles.homeWidthMd}>
          <p>このアプリはRenderのフリープランを使っています。そのため、サスペンドすることが度々あるのでその場合は最大50秒ほど待って更新してください。（現在DBが不具合発生中です）</p>
          <AddTodo
            inputTodo={inputTodo}
            setInputTodo={setInputTodo}
            onClickAdd={onClickAdd}
          />
          <section className={styles.section}>
            <TodoList
              incomplete={incomplete}
              complete={complete}
              onClickComplete={onClickComplete}
              onClickDelete={onClickDelete}
              onClickBack={onClickBack}
              handleState={handleState}
              changeDisplay={changeDisplay}
              loading={loading}
              setIncomplete={setIncomplete}
            />
          </section>
        </div>
      </div>
    </>
  );
}
