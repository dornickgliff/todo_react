import React from 'react';
import { useState } from 'react';
import TodoItem from './components/TodoItem';
import InputItem from './components/InputItem';
import AddButton from './components/AddButton';
import AddTaskModal from './components/AddTaskModal';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [weather, setWeather] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");  
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [draftTask, setDraftTask] = useState(null);
  const addTask = (taskObject) => {
    const updated = { ...taskObject, completed: false };
    setTasks([...tasks, updated]);
  };

  useEffect(() => {
    async function fetchWeather() {
      const API_KEY = "fbf90ff022271b7e9842eff74fc009bb"; // replace with your OpenWeatherMap key
      const city = "Houston";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await res.json();
      console.log(data)
  
      // Convert Kelvin → Celsius
      const tempC = Math.round(data.main.temp - 273.15);
  
      setWeather({
        city: data.name,
        temp: tempC,
        condition: data.weather[0].main,
      });
    }
  
    fetchWeather();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);
  
    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
  
    return statusMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen">
      <header className="h-48 bg-red-600 shadow-md flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Todo ApJp 🚀 </h1>
            {weather && (
        <div className="text-white text-lg font-semibold">
          🌤️ {weather.temp}°C | {weather.city}
        </div>
      )}
      </header>

      {/* Add Task Button */}
      <AddButton onOpen={() => setShowModal(true)} />

      <div className="flex gap-4 px-6 mt-6">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>

      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} onAdd={addTask} />
      )}
    

        <ul className="mt-6 px-6">
        {filteredTasks.map((task, index) => (
          <TodoItem
          key={index}
          completed={task.completed}
          isEditing={editingIndex === index}
          text={
            editingIndex === index ? draftTask?.name : task.name
          }
          priority={
            editingIndex === index ? draftTask?.priority : task.priority
          }
        
          onStartEdit={() => {
            setEditingIndex(index);
            setDraftTask({ ...task });
          }}
        
          onNameChange={(e) =>
            setDraftTask({ ...draftTask, name: e.target.value })
          }
        
          onPriorityChange={(e) =>
            setDraftTask({ ...draftTask, priority: e.target.value })
          }
        
          onSave={() => {
            const updated = [...tasks];
            updated[editingIndex] = draftTask;
            setTasks(updated);
            setEditingIndex(null);
            setDraftTask(null);
          }}
        
          onCancel={() => {
            setEditingIndex(null);
            setDraftTask(null);
          }}
        
          onComplete={() => {
            const updated = [...tasks];
            updated[index].completed = true;
            setTasks(updated);
          }}
        />
        ))}
      </ul>
    </div>
  );
}
