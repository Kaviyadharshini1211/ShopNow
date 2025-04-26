import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  recommendedProducts: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.model("Recommendation", recommendationSchema);
