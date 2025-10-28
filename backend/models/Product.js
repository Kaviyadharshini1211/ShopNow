import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  images: [{ type: String }],

  // 🔮 (optional, for AI recommendations)
  embedding: {
    type: [Number],
    default: [],
  },
});

export default mongoose.model("Product", productSchema);
