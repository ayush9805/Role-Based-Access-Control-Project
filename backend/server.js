import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js'; // --- 1. ADDED THIS IMPORT ---

// Load .env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow app to accept JSON

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes); // --- 2. ADDED THIS ROUTE ---

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});