// routes/recommend.js
import express from "express";
import { spawn } from "child_process";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  const python = spawn("python3", ["recommend.py", productId]); // use "python" if you're on Windows

  let data = "";

  python.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on("data", (err) => {
    console.error("Python Error:", err.toString());
  });

  python.on("close", async () => {
    try {
      const recommendedIds = JSON.parse(data);
      const products = await Product.find({
        _id: { $in: recommendedIds },
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Recommendation failed" });
    }
  });
});

export default router;
