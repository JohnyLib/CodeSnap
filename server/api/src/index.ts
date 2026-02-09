/**
 * CodeSnippet API Server
 * 
 * REST API for video rendering, authentication, and billing.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { renderRoutes } from './routes/render.js';
import { authRoutes } from './routes/auth.js';
import { billingRoutes } from './routes/billing.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));

// Add permissive CSP for development
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; connect-src *"
    );
    next();
});

// Serve static files (rendered videos)
const publicDir = path.join(__dirname, '../public');
app.use('/rendered', express.static(path.join(publicDir, 'rendered')));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/render', renderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
    console.log(`📂 Static files: ${path.join(publicDir, 'rendered')}`);
});

export default app;
