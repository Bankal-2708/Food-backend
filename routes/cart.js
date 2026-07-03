import express from 'express';
import Cart from '../models/Cart.js';
import protect from '../middleware/auth.js';

const router = express.Router();

 router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json({ success: true, data: cart ? cart.items : [] });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

 router.post('/', protect, async (req, res) => {
  try {
    const { items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { upsert: true, new: true }
    );

    res.json(cart);
  } catch {
    res.status(500).json({ message: "Error saving cart" });
  }
});

export default router;