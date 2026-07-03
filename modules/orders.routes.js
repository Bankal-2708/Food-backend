import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// In-memory order store (replace with DB in production)
let orders = [];

// Place a new order (from customer)
router.post("/place", (req, res) => {
  const { items, totalAmount, customerName, address } = req.body;
  if (!items || !totalAmount) {
    return res.status(400).json({ success: false, message: "Items and total amount are required." });
  }
  const order = {
    _id: `order_${Date.now()}`,
    items,
    totalAmount,
    customerName: customerName || "Guest",
    address: address || "Not provided",
    status: "pending",
    placedAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json({ success: true, message: "Order placed.", data: order });
});

// Admin: Get all orders
router.get("/all", authMiddleware, (req, res) => {
  res.json({ success: true, data: orders });
});

// Admin: Confirm an order
router.put("/confirm/:id", authMiddleware, (req, res) => {
  const order = orders.find((o) => o._id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found." });
  order.status = "confirmed";
  res.json({ success: true, message: "Order confirmed.", data: order });
});

// Admin: Mark order as delivered
router.put("/deliver/:id", authMiddleware, (req, res) => {
  const order = orders.find((o) => o._id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found." });
  order.status = "delivered";
  res.json({ success: true, message: "Order marked as delivered.", data: order });
});

// Admin: Cancel an order
router.delete("/cancel/:id", authMiddleware, (req, res) => {
  const idx = orders.findIndex((o) => o._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Order not found." });
  const [cancelled] = orders.splice(idx, 1);
  res.json({ success: true, message: "Order cancelled.", data: cancelled });
});

export default router;