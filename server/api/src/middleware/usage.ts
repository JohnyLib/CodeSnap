/**
 * Usage Middleware
 * 
 * Enforce usage limits based on user plan.
 */

import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { PLAN_LIMITS, type PlanType } from '@codesnippet/utils';

// In-memory usage tracking (use Redis in production)
const dailyUsage = new Map<string, { count: number; date: string }>();

// Mock user plans (use database in production)
const userPlans = new Map<string, PlanType>();

export function usageMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const { userId } = req.user;
    const today = new Date().toISOString().split('T')[0];
    const userPlan = userPlans.get(userId) || 'free';
    const limits = PLAN_LIMITS[userPlan];

    // Get or create usage record
    let usage = dailyUsage.get(userId);
    if (!usage || usage.date !== today) {
        usage = { count: 0, date: today };
        dailyUsage.set(userId, usage);
    }

    // Check limit
    if (usage.count >= limits.videosPerDay) {
        return res.status(429).json({
            error: 'Daily limit reached',
            limit: limits.videosPerDay,
            plan: userPlan,
            upgradeUrl: '/pricing',
        });
    }

    // Increment usage
    usage.count++;

    // Add limits info to request
    (req as any).usage = {
        used: usage.count,
        limit: limits.videosPerDay,
        remaining: limits.videosPerDay - usage.count,
    };

    next();
}

/**
 * Update user plan
 */
export function setUserPlan(userId: string, plan: PlanType) {
    userPlans.set(userId, plan);
}
