import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const itemRef = useRef();
  useEffect(() => {
    gsap.from(itemRef.current, { opacity: 0.9, scale: 0.9, duration: 0.5 });
  }, []);

  const timeLeft = task.dueDate
    ? (() => {
        const due = new Date(`${task.dueDate}T${task.dueTime || '23:59'}`);
        const now = new Date();
        const diffMs = due - now;

        if (diffMs <= 0) return '⏰ Overdue';

        const diffMins = Math.floor(diffMs / 60000);
        const days = Math.floor(diffMins / 1440);
        const hours = Math.floor((diffMins % 1440) / 60);
        const mins = diffMins % 60;

        return `⏳ ${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${mins}m left`;
      })()
    : 'No due date';

  const priorityBadge = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-yellow-500 text-black',
    Low: 'bg-green-500 text-white',
  };

  return (
    <div
      ref={itemRef}
      className={`task-item p-4 mb-3 rounded-lg shadow-md flex justify-between items-start transition-transform
        ${task.completed ? 'bg-gray-100 dark:bg-gray-700 opacity-60' : 'bg-white dark:bg-gray-800'}
      `}
    >
      <div className="flex-1">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1"
          />
          <div>
            <strong
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-300' : ''
              }`}
            >
              {task.title}
            </strong>
            <p
              className={`text-sm ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {task.description}
            </p>
            <small
              className={`block text-xs mt-1 ${
                timeLeft.includes('Overdue') ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {new Date(task.createdAt).toLocaleString()} – {timeLeft}
            </small>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs rounded font-medium ${priorityBadge[task.priority]}`}
            >
              Priority: {task.priority}
            </span>
          </div>
        </label>
      </div>

      <div className="flex flex-col gap-1 ml-3">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 dark:text-red-400 hover:underline text-sm"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
