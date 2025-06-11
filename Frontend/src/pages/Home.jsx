import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const Home = () => {
  const { state } = useLocation();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("in-progress");
  const [tasks, setTasks] = useState([]);
  // const [data, setData] = useState([]);

  const username = state?.username;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/home/tasks/${id}`)
      .then((response) => {
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);

        if (fetchedTasks.length > 0) {
          setTask(fetchedTasks[0].text);
          setPriority(fetchedTasks[0].priority);
          setStatus(fetchedTasks[0].status);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      priority,
      status,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("Medium");
    setStatus("Incomplete");
  };

  const updateStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };


  const filterTasksByStatus = (status) => {
  return tasks.filter((task) => task.status === status);
};

  return (
    <>
      <Header username={username} />
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
            Task Manager
          </h2>

          {/* Task Form */}
          <form onSubmit={addTask} className="space-y-4 mb-8">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Task description"
              className="w-full border border-blue-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-blue-300 px-4 py-2 rounded-md"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-blue-300 px-4 py-2 rounded-md"
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>

          {/* Task Lists */}
          <div className="flex justify-between">
            {/* Incomplete Tasks */}
            <div className="w-1/2 pr-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Incomplete Tasks
              </h3>
              {filterTasksByStatus("Incomplete").length === 0 ? (
                <p className="text-gray-500">No incomplete tasks.</p>
              ) : (
                <ul className="space-y-4">
                  {filterTasksByStatus("Incomplete").map((t) => (
                    <li
                      key={t.id}
                      className="flex justify-between items-center bg-blue-100 px-4 py-3 rounded-md"
                    >
                      <div>
                        <span className="text-lg font-medium">{t.text}</span>
                        <div className="text-sm mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-white ${
                              t.priority === "High"
                                ? "bg-red-500"
                                : t.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => updateStatus(t.id, "Completed")}
                        className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Mark as Completed
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Completed Tasks */}
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Completed Tasks
              </h3>
              {filterTasksByStatus("Completed").length === 0 ? (
                <p className="text-gray-500">No completed tasks.</p>
              ) : (
                <ul className="space-y-4">
                  {filterTasksByStatus("Completed").map((t) => (
                    <li
                      key={t.id}
                      className="flex justify-between items-center bg-blue-100 px-4 py-3 rounded-md"
                    >
                      <div>
                        <span className="text-lg font-medium">{t.text}</span>
                        <div className="text-sm mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-white ${
                              t.priority === "High"
                                ? "bg-red-500"
                                : t.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
