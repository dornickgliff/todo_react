import React, { useRef, useEffect } from "react";

export default function TodoItem({
  text,
  priority,
  completed,
  isEditing,
  onStartEdit,
  onNameChange,
  onPriorityChange,
  onSave,
  onCancel,
  onComplete,
}) {
  const editRef = useRef(null);

  const priorityColors = {
    Low: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    High: "bg-red-200 text-red-800",
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSave();
    if (e.key === "Escape") onCancel();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (editRef.current && !editRef.current.contains(event.target)) {
        onCancel();
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, onCancel]);

  return (
    <li className="flex justify-between items-center bg-white p-4 mb-3 rounded-lg shadow border">
      <div className="flex-1">
        {isEditing ? (
          <div ref={editRef}>
            <input
              value={text}
              onChange={onNameChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="border p-1 rounded w-full mb-2"
            />

            <select
              value={priority}
              onChange={onPriorityChange}
              onKeyDown={handleKeyDown}
              className="border p-1 rounded w-full mb-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              onClick={onSave}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <span
              onClick={!completed ? onStartEdit : undefined}
              className={`text-lg font-medium cursor-pointer ${
                completed
                  ? "line-through text-gray-400 cursor-not-allowed"
                  : ""
              }`}
            >
              {text}
            </span>

            <span
              className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[priority]}`}
            >
              {priority}
            </span>
          </>
        )}
      </div>

      {!completed && !isEditing && (
        <button
          onClick={onComplete}
          className="text-red-600 text-xl ml-3"
        >
          🗑️
        </button>
      )}
    </li>
  );
}
