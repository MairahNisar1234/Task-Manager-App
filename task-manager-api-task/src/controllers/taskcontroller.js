const Task = require('../models/Task');

// GET all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a task
const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTask = new Task({
      title,
      description,
      completed: completed || false, // Default to false if not provided
      user: req.user.id // Critical: Link task to the logged-in user
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    console.log("ID to update:", req.params.id);
    console.log("Data received from frontend:", req.body); 

    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { 
        $set: { 
          title, 
          description, 
          completed 
        } 
      }, 
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(updatedTask);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE a task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTasksbyCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const tasks = await Task.find({ user: req.user.id, category: category });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getTasks, createTask, updateTask, deleteTask, getTasksbyCategory };