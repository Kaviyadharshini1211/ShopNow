// routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getSingleProduct,
  getSimilarProducts,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ All Products
router.get("/", getProducts);

// ✅ Single Product
router.get("/:id", getSingleProduct);

// ✅ Similar Products (AI-based)
router.get("/:id/similar", getSimilarProducts);

export default router;
