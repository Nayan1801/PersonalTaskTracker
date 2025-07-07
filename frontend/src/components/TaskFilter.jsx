import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, counts }) => {
  return (
    <div className="task-filter flex gap-3 mb-4">
      {['All', 'Completed', 'Pending'].map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg font-medium transition shadow-md ${
            currentFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
          }`}
        >
          {filter} ({counts[filter] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
