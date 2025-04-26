import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Order", orderSchema);
