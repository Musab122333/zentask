const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

app.use(cors());
app.use(bodyParser.json());

// Helper function to read tasks
const readTasks = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
};

// Helper function to write tasks
const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks:', error);
    }
};

// GET /tasks - Return all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    const tasks = readTasks();
    const newTask = {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update a task status or title
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed, title } = req.body;
    
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (completed !== undefined) tasks[taskIndex].completed = completed;
    if (title !== undefined) tasks[taskIndex].title = title.trim();

    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    const initialLength = tasks.length;
    
    tasks = tasks.filter(t => t.id !== id);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }

    writeTasks(tasks);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
