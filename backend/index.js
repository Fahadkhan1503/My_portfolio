import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Format JSON responses with nice indentation
app.set('json spaces', 2);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio Backend API' });
});

app.listen(5000 ,() => {
    console.log('Server is running on port 5000');
})