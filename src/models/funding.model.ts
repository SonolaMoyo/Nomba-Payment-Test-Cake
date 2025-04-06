import mongoose from 'mongoose';

const fundingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  reference: String,
  systemRef: String,
  requestedAt: { type: Date, default: Date.now }
});

export const Funding = mongoose.model('Funding', fundingSchema);
