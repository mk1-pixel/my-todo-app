import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "../AddTodo/AddTodo.jsx";
import TodoList from "../TodoList/TodoList.jsx";
import { styles } from "./Home.module.jsx";
import { URL } from "../../const.js";
import { useTodoActions } from "../../hooks/useTodoActions.jsx";

export default function Home() {
  const {
    inputTodo,
    incomplete,
    complete,
    changeDisplay,
    loading,
    handleState,
    handleChange,
    onClickAdd,
    onClickComplete,
    onClickDelete,
    onClickBack,
} = useTodoActions();

  return (
    <>
      <div className={styles.homeOuter}>
        <div className={styles.homeWidthMd}>
          <AddTodo
            inputTodo={inputTodo}
            handleChange={handleChange}
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
            />
          </section>
        </div>
      </div>
    </>
  );
}
