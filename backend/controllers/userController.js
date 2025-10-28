// controllers/userController.js
import User from "../models/userModel.js";

// GET /api/users/profile/:id
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("wishlist"); // ✅ populate wishlist
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/profile/:id
export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update failed:", error.message);
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ POST /api/users/wishlist/:id
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      user.wishlist.push(productId); // add
    } else {
      user.wishlist.splice(index, 1); // remove
    }

    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    console.error("Wishlist update failed:", error.message);
    res.status(500).json({ message: "Wishlist update failed" });
  }
};
