import express from "express";
import { foodController } from "./food.controller.js";
import auth from '../../middleware/auth.js';
import upload from '../../middleware/upload.js';

const router = express.Router();

// Public routes
router.get("/", foodController.getAll);

// Admin-protected routes
router.post("/add", auth, foodController.add);
router.delete("/remove/:id", auth, foodController.remove);
router.put("/update/:id", auth, foodController.update);

// Image upload route
router.post("/upload", auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});

export default router;