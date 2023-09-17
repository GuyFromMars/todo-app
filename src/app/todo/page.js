"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

export default function Todo() {
  const [c, setC] = useState([]);
  const [visible, setVisible] = useState(false);
  const [oldtask, setOldTask] = useState("");
  const [newData, setNewData] = useState([]);

  const formSchema = Yup.object().shape({
    task: Yup.string().required("Enter a task"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      task: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    await axios.post("/api/users/todos/addTodo", data);
    getTodos();
    reset();
  };

  async function getTodos() {
    const api = await axios.get("/api/users/todos/getTodos");
    const apiJson = api.data.allTodos;
    setC(apiJson);
  }

  useEffect(() => {
    const gT = getTodos();
    return () => clearInterval(gT);
  }, []);

  const completeTodo = async (data) => {
    console.log(data);
    await axios.post("/api/users/todos/completeTodo", data);
    const arrId = data[0].taskId;
    const toggleComolete = c[arrId].completed;
    const oldObj = c[arrId];
    const newObj = { ...oldObj, completed: !toggleComolete };
    const newArr = [...c];
    newArr[arrId] = newObj;
    setC(newArr);
  };

  const editTodo = async () => {
    const data = { ...newData[0], task: oldtask };
    await axios.post("/api/users/todos/editTodo", data);
    setVisible(false);
    const arrId = data.taskId;
    const oldObj = c[arrId];
    const newObj = { ...oldObj, task: oldtask };
    const newArr = [...c];
    newArr[arrId] = newObj;
    setC(newArr);
  };

  const delTodo = async (data) => {
    await axios.post("/api/users/todos/delTodo", data);
    getTodos();
  };
  const taskElement = c
    ?.map((cs, key) => {
      const completeTodoData = [{ id: cs._id, taskId: key }];
      const apiData = [{ id: cs._id, taskId: key }];
      return (
        <span
          key={key}
          className="flex justify-between py-1 rounded mt-0.5 w-full"
        >
          <p
            id={cs._id}
            onClick={() => {
              completeTodo(completeTodoData);
            }}
            style={{
              textDecoration: cs.completed ? "line-through" : "none",
              textTransform: "capitalize",
            }}
          >
            {cs.task}
          </p>
          <span className="flex justify-between space-x-6">
            <svg
              id={cs._id}
              onClick={() => {
                setNewData(apiData);
                setOldTask(cs.task);
                setVisible(true);
              }}
              style={{ display: cs.completed ? "none" : "block" }}
              className="w-[16px] h-[16px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
              />
            </svg>
            <svg
              id={cs._id}
              onClick={() => {
                delTodo(apiData);
              }}
              className="w-[16px] h-[16px] text-red-800 dark:text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
          </span>
        </span>
      );
    })
    .reverse();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              action="#"
              className="flex flex-col justify-between w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              {errors.task?.message && (
                <small className="text-center w-full" style={{ color: "red" }}>
                  {errors.task.message}
                </small>
              )}
              <div className="flex space-x-2 items-center justify-between w-full my-4">
                <input
                  type="text"
                  id="task"
                  name="task"
                  autoFocus="true"
                  autoComplete="off"
                  {...register("task")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter a task"
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </form>
            {taskElement.length < 1 ? "No tasks yet" : taskElement}
          </div>
        </div>
      </div>
      <div
        style={{ visibility: visible ? "visible" : "hidden" }}
        tabIndex={-1}
        className="flex content-center justify-center absolute top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg text-center font-medium text-gray-900 dark:text-white">
                Edit task
              </h3>
              <button
                onClick={() => {
                  setVisible(false);
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="small-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex space-x-2 items-center justify-between w-full my-4">
                <input
                  value={oldtask}
                  onChange={(e) => {
                    setOldTask(e.target.value);
                  }}
                  type="text"
                  autoFocus="true"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Edit a task"
                />
                <button
                  onClick={() => {
                    editTodo();
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
