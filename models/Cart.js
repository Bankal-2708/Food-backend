import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: String,
  image: String,
  count: Number,
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  items: [itemSchema],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);