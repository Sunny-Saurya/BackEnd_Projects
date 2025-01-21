import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

// MongoDB Connection
const connect = mongoose.connect(process.env.MONGO_URI);

connect
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

// Define Schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define and Export Model
const User = mongoose.model("User", LoginSchema);
export default User;
