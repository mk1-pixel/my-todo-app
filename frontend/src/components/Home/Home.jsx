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
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleState = () => {
    changeDisplay ? setChangeDisplay(false) : setChangeDisplay(true);
  };

  const handleChange = (e) => {
    setInputTodo(e.target.value);
  };

  const onClickAdd = () => {
    if (inputTodo === "") return;
    const onAdd = async () => {
      setLoading(true);
      const startTime = Date.now();
      try {
        const res = await axios.post(apiUrl, {
          title: inputTodo,
        });
        setIncomplete([...incomplete, res.data]);
        setInputTodo("");
      } catch (err) {
        console.log(err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;
        setTimeout(
          () => {
            setLoading(false);
          },
          remaining > 0 ? remaining : 0
        );
      }
    };
    onAdd();
  };

  const onClickComplete = (todo, index) => {
    const onComplete = async () => {
      try {
        const res = await axios.put(`${apiUrl}${todo.id}`, todo);
        console.log(res)
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
        const res = await axios.delete(`${apiUrl}${id}`);
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
        const res = await axios.put(`${apiUrl}${todo.id}`, todo);
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
    setLoading(true);
    const startTime = Date.now();

    const todoList = async () => {
      try {
        const res = await axios.get(apiUrl);
        console.log(res)
        return res;
      } catch (err) {
        console.log("err", err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;
        setTimeout(
          () => {
            setLoading(false);
          },
          remaining > 0 ? remaining : 0
        );
      }
    };

    todoList().then((res) => {
      const newIncomplete = [...incomplete];
      const newComplete = [...complete];
      res.data.map((todo) => {
        if(!todo.isCompleted){
          newIncomplete.push(todo);
        } else {
          newComplete.push(todo);
        }
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
              loading={loading}
            />
          </section>
        </div>
      </div>
    </>
  );
}
