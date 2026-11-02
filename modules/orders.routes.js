import express from "express";
import authMiddleware from "../middleware/auth.js";
import allowRoles from "../middleware/role.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// -------- Customer: Place a new order (from their own cart) --------
router.post("/place", authMiddleware, allowRoles("customer"), async (req, res) => {
  try {
    const { items, totalAmount, customerName, address } = req.body;
    if (!items || !totalAmount) {
      return res.status(400).json({ success: false, message: "Items and total amount are required." });
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      customerName: customerName || "Guest",
      address: address || "Not provided",
      status: "pending",
    });

    // Clear the customer's cart now that it has become a real order
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

    res.status(201).json({ success: true, message: "Order placed.", data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error placing order." });
  }
});

// -------- Customer: See their own past/current orders --------
router.get("/my", authMiddleware, allowRoles("customer"), async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error fetching orders." });
  }
});

// -------- Admin / Restaurant Manager: Get all orders --------
router.get("/all", authMiddleware, allowRoles("admin", "restaurantManager"), async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error fetching orders." });
  }
});

// -------- Admin / Restaurant Manager: Confirm an order --------
router.put("/confirm/:id", authMiddleware, allowRoles("admin", "restaurantManager"), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.json({ success: true, message: "Order confirmed.", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error confirming order." });
  }
});

// -------- Admin / Restaurant Manager: Mark order as delivered --------
router.put("/deliver/:id", authMiddleware, allowRoles("admin", "restaurantManager"), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "delivered" },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.json({ success: true, message: "Order marked as delivered.", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error updating order." });
  }
});

// -------- Admin only: Cancel an order --------
router.delete("/cancel/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.json({ success: true, message: "Order cancelled.", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error cancelling order." });
  }
});

export default router;