import express from "express";
import { getOrders, createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getOrders);  // Get all orders
router.post("/", protect, createOrder);  // Create an order

export default router;
