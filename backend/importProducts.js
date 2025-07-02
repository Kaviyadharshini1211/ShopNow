import mongoose from "mongoose";
import fs from "fs";
import Product from "./models/Product.js"; // Add `.js` extension when using ES modules

// Replace with your actual MongoDB URI
const MONGO_URI = "mongodb+srv://kaviyadharshinim3:zmcnB46jF0crUSoF@kaviya.kg8srtu.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => console.log("Connection error:", err));

// Read your JSON file
const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing data if needed
    await Product.insertMany(products);
    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("Import error:", error);
    process.exit(1);
  }
};

importData();
