// TaskForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('Medium');
  const formRef = useRef();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate || '');
      setDueTime(editingTask.dueTime || '');
      setPriority(editingTask.priority || 'Medium');
    }
    const tl = gsap.timeline();
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    ).to(formRef.current, {
      boxShadow: '0px 0px 20px rgba(59,130,246,0.4)',
      duration: 0.3,
      repeat: 1,
      yoyo: true
    });
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      id: editingTask?.id || Date.now(),
      title,
      description,
      dueDate,
      dueTime,
      priority,
      completed: editingTask?.completed || false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setPriority('Medium');
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="task-form flex flex-col gap-3 mt-30 mb-30 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-float"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 m-1 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 m-1 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2  m-1 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <input
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
        className="p-2 m-1 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 m-1 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="Low">🟢 Low Priority</option>
        <option value="Medium">🟡 Medium Priority</option>
        <option value="High">🔴 High Priority</option>
      </select>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 m-1 rounded-md hover:bg-green-700"
        >
          {editingTask ? 'Update' : 'Add'} Task
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </form>
  );
};

export default TaskForm;
