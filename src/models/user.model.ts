import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
