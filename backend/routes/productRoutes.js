import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ GET /api/products - All Products from MongoDB
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products from database" });
  }
});

// ✅ GET /api/products/:id - Single Product by ID from MongoDB
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;
