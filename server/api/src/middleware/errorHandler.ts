/**
 * Error Handler Middleware
 * 
 * Catches and formats errors for API responses.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('API Error:', err);

    // Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
    }

    // Generic error
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
}
