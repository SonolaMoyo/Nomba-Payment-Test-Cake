import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

export const Land = mongoose.model("Land", landSchema);
