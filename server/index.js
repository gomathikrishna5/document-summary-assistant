import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import uploadRoutes from './routes/uploadRoutes.js';
import summarizeRoutes from './routes/summarizeRoutes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Document Summary Assistant API is running',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'document-summary-assistant-server',
  });
});

// API routes
app.use('/api/upload', uploadRoutes);
app.use('/api/summarize', summarizeRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Document Summary Assistant API running on port ${PORT}`
  );
});