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

  const handleChange = (e) => {
    setInputTodo(e.target.value);
  };

  const onClickAdd = () => {
    if (inputTodo === "") return;
    const onAdd = async () => {
      setLoading(true);
      const startTime = Date.now();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7)
      try {
        const data = {
          title: inputTodo,
          isCompleted: false,
          createdDate: new Date().toISOString(),
          dueDate: dueDate.toISOString(),
          description: "",
          priority: 1,
        }
        console.log(data)
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
        const newIncomplete = [...incomplete];
        newIncomplete.splice(id, 1);
        setIncomplete(newIncomplete);
        const newComplete = [...complete, task];
        setComplete(newComplete);
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
    const onComplete = async () => {
      try {
        const res = await axios.put(`${apiUrl}${id}`, {
          Id: detailData.id,
          Title: detailData.title,
          IsCompleted: detailData.isCompleted,
          createdDate: detailData.createdDate,
          DueDate: new Date(detailData.dueDate).toISOString(),
          Description: detailData.description,
          Priority: detailData.priority,
        });
        const newIncomplete = [...incomplete];
        newIncomplete.splice(id, 1);
        setIncomplete(newIncomplete);
        const newComplete = [...complete, task];
        setComplete(newComplete);
        navigate(-1);
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
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    onDelete();
    const newTodos = [...incomplete];
    newTodos.splice(index, 1);
    setIncomplete(newTodos);
    navigate("/");
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
      const newIncomplete = [...incomplete];
      const newComplete = [...complete];
      res.data.map((todo) => {
        if (!todo.isCompleted) {
          newIncomplete.push(todo);
        } else {
          newComplete.push(todo);
        }
      });
      setIncomplete(newIncomplete);
      setComplete(newComplete);
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
    handleChange,
    setDetailData,
    onClickAdd,
    onClickComplete,
    onClickDelete,
    onClickBack,
    onClickRestore,
    getDetail,
    fetchDetail,
  };
}
