import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripeSessionId: String,
  suma: Number,
  status: String
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
