// api/index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/Projects.js';
import memberRoutes from './routes/member.js';

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: '*', // allow all origins temporarily
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/members', memberRoutes);

// ===== Test endpoint =====
app.get('/', (req, res) => res.json({ message: "Backend working 🚀" }));

// ===== MongoDB Connection =====
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
await connectDB();

// ===== Export for Vercel serverless =====
export default function handler(req, res) {
  return app(req, res);
}

// ===== Optional: local testing =====
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}