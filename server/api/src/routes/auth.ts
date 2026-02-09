/**
 * Auth Routes
 * 
 * Authentication endpoints (email + OAuth).
 */

import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

// Schemas
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
});

// In-memory user storage (use database in production)
const users = new Map<string, {
    id: string;
    email: string;
    name: string;
    password: string;
    plan: 'free' | 'pro' | 'agency';
    videosToday: number;
    createdAt: Date;
}>();

/**
 * POST /api/auth/register
 */
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, name } = registerSchema.parse(req.body);

        if (users.has(email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = {
            id: `user_${Date.now()}`,
            email,
            name,
            password, // In production: hash with bcrypt
            plan: 'free' as const,
            videosToday: 0,
            createdAt: new Date(),
        };

        users.set(email, user);

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
            token,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = users.get(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
            token,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/auth/me
 */
router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

        const user = users.get(decoded.email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
        });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

/**
 * POST /api/auth/google
 * Google OAuth callback
 */
router.post('/google', async (req, res, next) => {
    try {
        const { credential } = req.body;

        // In production: verify Google JWT and extract user info
        // For now, return mock response

        const mockUser = {
            id: `google_${Date.now()}`,
            email: 'demo@example.com',
            name: 'Demo User',
            plan: 'free' as const,
        };

        const token = jwt.sign(
            { userId: mockUser.id, email: mockUser.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ user: mockUser, token });
    } catch (error) {
        next(error);
    }
});

export { router as authRoutes };
