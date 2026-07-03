import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import foodRoutes from './api/food/food.routes.js'; // ✅ NEW

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    // add your deployed frontend URL here once it's live, e.g.
    // 'https://your-frontend.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cache the DB connection across invocations (important for serverless)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.log('DB Error:', err);
  }
}
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Only listen locally — Vercel handles this in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;