import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI , { })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Task Schema and Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post('/api/task', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input fields
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Create and save a new task
    const newTask = new Task({ title, description });
    await newTask.save();

    res.status(201).json({ message: "Task added", task: newTask });
  } catch (err) {
    res.status(500).json({ error: "Error adding task", details: err.message });
  }
});


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
    console.log(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks", details: err.message });
  }
});

app.get('/api/task/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    const task = await Task.findById(id);

    // Check if a task with the given ID exists
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error fetching task", details: err.message });
  }
});


app.delete('/api/tasks/:id', async(req, res) => {
  try{
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.json({message : " Task deleted successfully"});
  }
  catch(err){
    res.status(500).json({error : "Error deleting task", details : err.message});
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
