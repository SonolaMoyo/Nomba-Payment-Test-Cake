import mongoose from "mongoose";

const virtualAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountNumber: { type: String, required: true, unique: true },
  bankName: String
});

export const VirtualAccount = mongoose.model("VirtualAccount", virtualAccountSchema);
