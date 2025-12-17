import React from "react";

export default function AddButton({ onOpen }) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onOpen}
        className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-lg text-lg font-semibold hover:bg-red-700 transition"
      >
        + Add Task
      </button>
    </div>
  );
}
