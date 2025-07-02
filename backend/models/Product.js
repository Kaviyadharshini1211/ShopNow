import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  brand: String,
  description: String,
  price: Number,
  originalPrice: Number, // 👈 new field
  category: String,
  subcategory: String,
  image: String
});

export default mongoose.model("Product", productSchema);
