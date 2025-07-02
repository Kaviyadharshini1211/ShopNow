// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  address: {
    addressLine: { type: String },
    city: { type: String },
    pincode: { type: String }
  },
  password: { type: String }, // optional if using email/password
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
