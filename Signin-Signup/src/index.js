import express from "express";
import bcrypt from "bcrypt";
import User from "./config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { fullname, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ name: fullname });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name: fullname,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send({ message: "Error creating user" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
