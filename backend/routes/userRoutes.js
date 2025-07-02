// routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// ✅ Get user profile by ID (e.g., /api/users/profile/64abc123...)
router.get("/profile/:id", getUserProfile);

// ✅ Update user profile by ID (including address, mobile, etc.)
router.put("/profile/:id", updateUserProfile);

export default router;
