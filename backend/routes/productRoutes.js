import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// For __dirname workaround in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Reusable function to load products
const loadProducts = () => {
  const dataPath = path.join(__dirname, "../products.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// GET /api/products - All Products
router.get("/", (req, res) => {
  try {
    const products = loadProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to load product data" });
  }
});

// ✅ GET /api/products/:id - Single Product by ID
router.get("/:id", (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.id.toString() === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load product data" });
  }
});

export default router;
