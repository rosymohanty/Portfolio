import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// ⚠️ IMPORTANT: Import routes AFTER dotenv.config()
import contactRoutes from "./routes/contactRoutes.js";

// Debug: Check env variables are loaded
console.log("=== Environment Check ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);
console.log("=========================");

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

// Routes
app.use("/api/contact", contactRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});