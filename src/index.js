import express from "express";
import dotenv from 'dotenv';

import { connectDB } from "./config/db.js";

import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";

import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json()); // Middleware to parse JSON body
app.use(rateLimiter); // Middleware to apply rate limiting

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});