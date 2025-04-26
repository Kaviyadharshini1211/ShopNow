import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import redisClient from "./config/redis.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ Fixed import (ES module compatible)

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/products", productRoutes); // ✅ Added with proper import

// Temporary test route (optional)
app.get("/api/products/test", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 },
  ]);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
