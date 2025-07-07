import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskFilter from './components/TaskFilter';
// import SearchBar from './components/SearchBar';
// import DarkModeToggle from './components/DarkModeToggle';
// import { loadTasks, saveTasks } from './utils/localStorage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import './styles/App.css';

function App() {

  const [count, setCount] = useState(0)
  const [user, setUser] = useState(localStorage.getItem("username"));

  const handleLogin = (username) => {
    setUser(username);
  };
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )

}
export default App;
