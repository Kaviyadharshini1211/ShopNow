import Recommendation from "../models/Recommendation.js";



export const getRecommendations = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
  }

  // Mock recommendation data (Replace with AI logic later)
  const recommendations = [
      { id: 1, name: "Smartphone", category: "Electronics" },
      { id: 2, name: "Laptop", category: "Computers" },
      { id: 3, name: "Running Shoes", category: "Sportswear" },
  ];

  res.status(200).json({ userId, recommendations });
};

