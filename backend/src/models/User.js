import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nume: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  parolaHash: { type: String, required: true },
  rol: { type: String, enum: ['client', 'admin'], default: 'client' },
  plan: { type: String, enum: ['gratuit', 'premium'], default: 'gratuit' },
  activ: { type: Boolean, default: true },
  refreshToken: String,
  resetToken: String,
  resetExp: Date
}, { timestamps: true });

export default mongoose.model('User', userSchema);
