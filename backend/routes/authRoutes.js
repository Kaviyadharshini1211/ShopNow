import express from "express";
import { register, login } from "../controllers/authController.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken"; // ✅ Use ES Module import
import User from "../models/userModel.js"; // ✅ Import your user model

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // ✅ Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // ✅ If not exists, create it
      user = await User.create({
        name,
        email,
        password: "", // Google users don't have passwords
        picture,      // Optional: store profile pic
      });
    }

    // ✅ Generate JWT safely without overwriting the original token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Return the new JWT token and user
    res.json({ token: jwtToken, user });

  } catch (err) {
    console.error("Google login failed:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
});

router.post("/register", register);
router.post("/login", login);

export default router;
