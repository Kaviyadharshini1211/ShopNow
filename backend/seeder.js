// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // your MongoDB Atlas URI in .env

const seedProducts = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Delete existing products (safety step)
    await Product.deleteMany({});
    console.log("🧹 Old products deleted");

    // 3️⃣ Load the new JSON file
    const data = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

    // 4️⃣ Insert all products
    await Product.insertMany(data);
    console.log(`🚀 Inserted ${data.length} products successfully!`);

    // 5️⃣ Close connection
    process.exit();
  } catch (error) {
    console.error("❌ Error while seeding data:", error);
    process.exit(1);
  }
};

seedProducts();
