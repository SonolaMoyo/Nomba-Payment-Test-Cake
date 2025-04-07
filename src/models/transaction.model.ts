import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  source: String,
  reference: { type: String, unique: true, required: true },
  narration: String,
  createdAt: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
