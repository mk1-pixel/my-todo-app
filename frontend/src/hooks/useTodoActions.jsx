import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { utils } from "../utils/utils";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export function useTodoActions() {
  const [inputTodo, setInputTodo] = useState("");
  const [incomplete, setIncomplete] = useState([]);
  const [complete, setComplete] = useState([]);
  const [changeDisplay, setChangeDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({
    id: 0,
    title: "",
    isCompleted: false,
    createdDate: "",
    dueDate: "",
    description: "",
    priority: 0,
  });
  const navigate = useNavigate();

  const handleState = () => {
    changeDisplay ? setChangeDisplay(false) : setChangeDisplay(true);
  };

  const onClickAdd = () => {
    if (inputTodo === "") return;
    const onAdd = async () => {
      setLoading(true);
      const startTime = Date.now();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      try {
        const data = {
          title: inputTodo,
          isCompleted: false,
          createdDate: new Date().toISOString(),
          dueDate: null,
          description: "",
          priority: 1,
        };
        console.log(data);
        const res = await axios.post(apiUrl, data);
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

  const onClickComplete = (e, id) => {
    const res = incomplete.filter((todo) => {
      return todo.id == id;
    });
    const task = res[0];
    const onComplete = async () => {
      try {
        const res = await axios.put(`${apiUrl}${id}`, {
          Id: task.id,
          Title: task.title,
          IsCompleted: true,
          createdDate: task.createdDate,
          DueDate: task.dueDate,
          Description: task.description,
          Priority: task.priority,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    onComplete();
  };

  const onClickRestore = (e, id) => {
    const res = incomplete.filter((todo) => {
      return todo.id == id;
    });
    const task = res[0];
    console.log(detailData)
    const onComplete = async () => {
      try {
        const res = await axios.put(`${apiUrl}${id}`, {
          Id: detailData.id,
          Title: detailData.title,
          IsCompleted: detailData.isCompleted,
          createdDate: detailData.createdDate,
          DueDate: detailData.dueDate,
          Description: detailData.description,
          Priority: detailData.priority,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    onComplete();
  };

  const onClickDelete = (id, index) => {
    const result = window.confirm("削除しますか");
    if (!result) return;

    const onDelete = async () => {
      try {
        const res = await axios.delete(`${apiUrl}${id}`);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    onDelete();
  };

  const onClickBack = (todo, index) => {
    todo.isCompleted = false;
    const onBack = async () => {
      try {
        const res = await axios.put(`${apiUrl}${todo.id}`, todo);
        await fetchTodos();
      } catch (err) {
        console.log(err);
      }
    };
    onBack();
  };

  const getDetail = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTodos = () => {
    setLoading(true);
    const startTime = Date.now();

    const todoList = async () => {
      try {
        const res = await axios.get(apiUrl);
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
      splitTodos(res.data)
    });
  };
  const fetchDetail = (id) => {
    useEffect(() => {
      const res = async () => {
        try {
          const result = await getDetail(id);
          detailData.id = result.id;
          detailData.title = result.title;
          detailData.createdDate = result.createdDate;
          detailData.dueDate = result.dueDate;
          detailData.description = result.description;
          detailData.isCompleted = result.isCompleted;
          detailData.priority = result.priority;
        } catch (err) {
          console.log(err);
        }
      };
      res();
    }, [id]);
  };

  const splitTodos = (todos) => {
    const newIncomplete = [];
    const newComplete = [];
    todos.map((todo) => {
      if (!todo.isCompleted) {
        newIncomplete.push(todo);
      } else {
        newComplete.push(todo);
      }
    });
    setIncomplete(newIncomplete);
    setComplete(newComplete);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    inputTodo,
    incomplete,
    complete,
    changeDisplay,
    loading,
    detailData,
    handleState,
    setInputTodo,
    setDetailData,
    onClickAdd,
    onClickComplete,
    onClickDelete,
    onClickBack,
    onClickRestore,
    getDetail,
    fetchDetail,
    splitTodos,
  };
}
