import React, { useState } from 'react';

export default function AddTaskModal({ onClose, onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleAdd = () => {
    if (taskName.trim() === '') return;

    onAdd({
      name: taskName,
      priority: priority,
    });

    onClose();
  };

  return (
    <div className="fixed top-1/4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-6 w-80 border">
      <h2 className="text-xl font-bold mb-4 text-red-600">Add Task</h2>

      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Add
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
