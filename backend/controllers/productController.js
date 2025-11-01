// controllers/productController.js
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// ✅ Helper function: cosine similarity
function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return -1;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return -1;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// ✅ Controller: Get all products (from MongoDB or fallback JSON)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ MongoDB fetch failed:", err.message);
    // fallback to local JSON if DB fails
    const filePath = path.resolve("backend/products.json");
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  }
};

// ✅ Controller: Get single product by ID
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ✅ Controller: Get similar products using embeddings
export const getSimilarProducts = async (req, res) => {
  try {
    const id = req.params.id;

    // find base product
    const product = await Product.findOne({ id: Number(id) });
    if (!product || !product.embedding?.length) {
      return res
        .status(404)
        .json({ message: "Product not found or has no embedding" });
    }

    // find all other products with embeddings
    const allProducts = await Product.find({
      id: { $ne: Number(id) },
      embedding: { $exists: true, $ne: [] },
    }).select("id title price thumbnail images category brand embedding");

    // compute similarity
    const results = allProducts.map((p) => ({
      product: p,
      similarity: cosineSimilarity(product.embedding, p.embedding),
    }));

    // pick top 6
    const top = results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6)
      .map((r) => r.product);

    res.json(top);
  } catch (error) {
    console.error("❌ Failed to get similar products:", error);
    res.status(500).json({ error: "Failed to get similar products" });
  }
};
