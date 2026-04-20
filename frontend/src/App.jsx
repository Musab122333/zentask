import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Check, Filter, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/main.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await axios.post(API_URL, { title });
      setTasks([response.data, ...tasks]);
      setTitle('');
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { completed: !currentStatus });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="glass-panel">
      <h1>ZenTask</h1>
      
      <form className="task-form" onSubmit={addTask}>
        <input 
          type="text" 
          className="task-input" 
          placeholder="What needs to be done?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="add-btn">
          <Plus size={24} />
        </button>
      </form>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'incomplete' ? 'active' : ''}`}
          onClick={() => setFilter('incomplete')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {error && <div style={{ color: 'var(--danger)', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

      <div className="task-list">
        {loading ? (
          <p style={{ textAlign: 'center', opacity: 0.5 }}>Syncing with universe...</p>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <ListTodo size={48} />
            <p>{filter === 'all' ? 'Your plate is clean. Add a task!' : 'Nothing found here.'}</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="task-item"
              >
                <div 
                  className={`task-checkbox ${task.completed ? 'completed' : ''}`}
                  onClick={() => toggleTask(task.id, task.completed)}
                >
                  {task.completed && <Check size={14} color="white" />}
                </div>
                <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;
