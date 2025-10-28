// routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  toggleWishlist, // ✅ Import new controller
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);
router.post("/wishlist/:id", toggleWishlist); // ✅ Add this

export default router;
