import mongoose from "mongoose";

const landOwnershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  landId: { type: mongoose.Schema.Types.ObjectId, ref: "Land", required: true },
  amountPaid: Number,
  purchasedAt: { type: Date, default: Date.now }
});

export const LandOwnership = mongoose.model("LandOwnership", landOwnershipSchema); 