import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import SearchBar from "../components/SearchBar";
import DarkModeToggle from "../components/DarkModeToggle";
import { loadTasks, saveTasks } from "../utils/localStorage";
import ProgressWheel from '../components/ProgressWheel';
import '../styles/App.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState(loadTasks());
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!username) navigate("/");
  }, [username]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddOrUpdateTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditingTask(null);
    } else {
      const newTask = {
        ...task,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleToggle = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchTitle = t.title.toLowerCase().includes(query.toLowerCase());
    const matchStatus =
      filter === "All" ||
      (filter === "Completed" && t.completed) ||
      (filter === "Pending" && !t.completed);
    return matchTitle && matchStatus;
  });

  const counts = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-4xl mx-auto pt-8 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mr-5">Welcome, {username}</h1>
          <DarkModeToggle />
        </div>

        <SearchBar query={query} setQuery={setQuery} />

        <TaskForm
          onSubmit={handleAddOrUpdateTask}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <div className="flex justify-center mb-6">
            <ProgressWheel completed={counts.Completed} total={counts.All} />
        </div>


        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
