import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation', required: true },
  nume: String,
  telefon: String,
  particip: Boolean,
  nrPersoane: Number,
  mesaj: String
}, { timestamps: true });

export default mongoose.model('Rsvp', rsvpSchema);
