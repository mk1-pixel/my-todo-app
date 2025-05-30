import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "../AddTodo/AddTodo.jsx";
import TodoList from "../TodoList/TodoList.jsx";
import { styles } from "./Home.module.jsx";
import { URL } from "../../const.js";

export default function Home() {
  const [inputTodo, setInputTodo] = useState("");
  const [incomplete, setIncomplete] = useState([]);
  const [complete, setComplete] = useState([]);
  const [changeDisplay, setChangeDisplay] = useState(true);

  const handleState = () => {
    changeDisplay ? setChangeDisplay(false) : setChangeDisplay(true);
  };

  const handleChange = (e) => {
    setInputTodo(e.target.value);
  };

  const onClickAdd = () => {
    if (inputTodo === "") return;
    const onAdd = async () => {
      try {
        const res = await axios.post(URL.URL, {
          title: inputTodo,
        });
        setIncomplete([...incomplete, res.data]);
        setInputTodo("");
      } catch (err) {
        console.log(err);
      }
    };
    onAdd();
  };

  const onClickComplete = (todo, index) => {
    const onComplete = async () => {
      try {
        const res = await axios.put(`${URL.URL}${todo.id}`, todo);
        const newIncomplete = [...incomplete];
        newIncomplete.splice(index, 1);
        setIncomplete(newIncomplete);
        const newComplete = [...complete, todo];
        setComplete(newComplete);
      } catch (err) {
        console.log(err);
      }
    };
    onComplete();
  };

  const onClickDelete = (id, index) => {
    const onDelete = async () => {
      try {
        const res = await axios.delete(`${URL.URL}${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    onDelete();
    const newTodos = [...incomplete];
    newTodos.splice(index, 1);
    setIncomplete(newTodos);
  };

  const onClickBack = (todo, index) => {
    const onBack = async () => {
      try {
        const res = await axios.put(`${URL.URL}${todo.id}`, todo);
      } catch (err) {
        console.log(err);
      }
    };

    onBack();
    const newIncomplete = [...incomplete, todo];
    setIncomplete(newIncomplete);

    const newComplete = [...complete];
    newComplete.splice(index, 1);
    setComplete(newComplete);
  };

  const fetchTodos = () => {
    const todoList = async () => {
      try {
        const res = await axios.get(URL.URL);
        return res;
      } catch (err) {
        console.log("err", err);
      }
    };

    todoList().then((res) => {
      const newIncomplete = [...incomplete];
      const newComplete = [...complete];
      res.data.map((todo) => {
        newIncomplete.push(todo);
      });
      setIncomplete(newIncomplete);
      setComplete(newComplete);
    });
  };
  useEffect(() => {
    fetchTodos();
  }, []);

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
            />
          </section>
        </div>
      </div>
    </>
  );
}
