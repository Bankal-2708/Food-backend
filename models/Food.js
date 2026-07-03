import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: null },
  rating: { type: Number, default: 4.0 },
  count: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);
