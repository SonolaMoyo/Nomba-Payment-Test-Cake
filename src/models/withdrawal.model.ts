import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: Number,
  status: { type: String, enum: ["pending", "successful", "failed"], default: "pending" },
  reference: { type: String, required: true },
  transactionId: { type: String, required: true, default: "invalid" },
  requestedAt: { type: Date, default: Date.now }
});

export const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
