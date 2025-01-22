import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");

  // Fetch tasks from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3000/api/task", {
        title: task,
        description: details,
        completed: false, // Explicitly set completed to false
      });
  
      setTasks([...tasks, { ...response.data.task, completed: false }]); // Ensure the task in the state has a completed property
      setTask("");
      setDetails("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  const handleToggleComplete = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 neon-text">
        Plan Your Day
      </h1>
      <form onSubmit={addTask} className="mb-6">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task Title (e.g., Workout)"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-teal-400"
          />
          <textarea
            placeholder="Details (e.g., Morning yoga to boost energy)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-teal-400"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-teal-500 hover:bg-teal-600 neon-btn transition-all text-white"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {tasks.map((taskItem, index) => (
          <div
            key={taskItem._id || index}
            className={`p-4 rounded-md flex justify-between items-center ${
              taskItem.completed ? "bg-green-800" : "bg-gray-800"
            }`}
          >
            <div>
              <h3 className="text-lg font-bold">{taskItem.title}</h3>
              <p className="text-sm">{taskItem.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleComplete(index)}
                className={`p-2 rounded-md ${
                  taskItem.completed
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                {taskItem.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="p-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
