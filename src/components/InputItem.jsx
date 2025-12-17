import React from 'react';
import { useState } from 'react';

function InputItem({ onAddTask }) {
  const [inputValue, setInputValue] = useState(' ');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAddTask(inputValue);
    setInputValue('');
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <input
        type="text"
        placeholder="Enter a task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default InputItem;
