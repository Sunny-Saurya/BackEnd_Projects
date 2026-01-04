import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Contact from "./models/contact.js";

dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve frontend
app.use(express.static("public"));

connectDB();

// POST route
app.get("/api/submit_contact", async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            user: "000000000000000000000000" // temporary user
        });

        res.status(201).json({
            message: "Contact saved successfully",
            contact
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to save contact",
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
