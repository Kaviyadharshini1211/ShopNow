// server.js (ES Module version)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import redisClient from "./config/redis.js"; // might be null if env missing
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ user routes added
import orderRoutes from "./routes/orderRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import recommendRoutes from "./routes/recommend.js"; // ✅ recommended products

dotenv.config();
connectDB(); // MongoDB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Handle Redis safely
if (redisClient) {
  redisClient.connect()
    .then(() => console.log("✅ Redis connected"))
    .catch((err) => console.error("Redis connection failed:", err.message));
} else {
  console.warn("⚠️ Redis not initialized — REDIS_HOST/PORT not set.");
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // profile fetch/update
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/ai", aiRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working fine 👌" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
