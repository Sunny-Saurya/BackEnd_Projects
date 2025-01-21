import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./admin.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));

  
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });  // Send message to frontend
});

// save user data 

app.post("/users", async(req, res) => {
  try{
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
    res.json({ message: "User saved successfully" });
    
  }
  catch(err){
    res.status(500).json({ message: err.message });
    res.json({message : "User not saved"});
  }
  if(!res.headersSent){
    res.status(500).json({ message: "Error Creating User" });
  }

})

// performing crud operations
// Retriving all users

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Failed to register user" });
  }
});

app.get("/users", async(req, res) => {
  try{
    const users = await User.find();
    res.json(users);
  }
  catch(err){
    res.status(500).json({ message: "Failed to fetch users" }); 
  }
})

// get specific user from their id 

app.get("/users/:id", async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
});



// deleting user

app.delete("/users/:id", async(req, res) =>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      res.status(404).json({ message: "User not found" });
    }
    else{
      res.json({ message: "User deleted successfully" });
    }
  }
  catch(err){
    res.status(500).json({ message: "Failed to delete user" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
