import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, lowercase: true },
  otpHash: { type: String, required: true },
  purpose: { type: String, enum: ['register', 'reset'], required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Otp', otpSchema);
