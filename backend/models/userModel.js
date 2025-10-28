// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    address: {
      addressLine: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
    password: { type: String }, // For email/password users
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // ✅ New field
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
