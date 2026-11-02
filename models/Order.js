import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: String,
  count: Number,
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, default: 'Guest' },
  address: { type: String, default: 'Not provided' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true }); // createdAt/updatedAt come free with timestamps

export default mongoose.model('Order', orderSchema);