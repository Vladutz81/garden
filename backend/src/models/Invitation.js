import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, unique: true, required: true },
  titlu: String,
  template: { type: String, default: 'elegant-gold' },
  dataEveniment: Date,
  locatie: String,
  googleMapsUrl: String,
  textPersonalizat: String,
  galerie: [String],
  premiumLocked: { type: Boolean, default: true },
  qrCodeUrl: String
}, { timestamps: true });

export default mongoose.model('Invitation', invitationSchema);
