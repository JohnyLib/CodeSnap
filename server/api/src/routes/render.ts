/**
 * Render Routes
 * 
 * API endpoints for video rendering using Remotion.
 */

import { Router } from 'express';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { renderVideo, getVideoPath, type RenderOptions } from '../services/render.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Request validation schema
const renderRequestSchema = z.object({
    code: z.string().min(1).max(5000),
    language: z.enum(['javascript', 'typescript', 'jsx', 'tsx']),
    themeId: z.string().default('revorgs-bronze'),
    animationType: z.enum(['typing', 'entrance', 'glow']).default('typing'),
    showLineNumbers: z.boolean().default(true),
    showWatermark: z.boolean().default(true),
    outputFormat: z.enum(['mp4', 'webm']).default('mp4'),
});

// In-memory job storage (use Redis in production)
interface RenderJob {
    status: 'queued' | 'rendering' | 'completed' | 'failed';
    progress: number;
    downloadUrl?: string;
    error?: string;
    createdAt: Date;
}

const renderJobs = new Map<string, RenderJob>();

/**
 * POST /api/render
 * Start a new render job
 */
router.post('/', async (req, res, next) => {
    try {
        const data = renderRequestSchema.parse(req.body);
        const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        // Initialize job
        renderJobs.set(jobId, {
            status: 'queued',
            progress: 0,
            createdAt: new Date(),
        });

        // Start async rendering
        processRenderJob(jobId, data).catch(err => {
            console.error(`Render job ${jobId} failed:`, err);
            const job = renderJobs.get(jobId);
            if (job) {
                job.status = 'failed';
                job.error = err.message || 'Unknown error';
            }
        });

        res.json({
            jobId,
            status: 'queued',
            message: 'Render job started',
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/render/:jobId
 * Get render job status
 */
router.get('/:jobId', (req, res) => {
    const { jobId } = req.params;
    const job = renderJobs.get(jobId);

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
        jobId,
        status: job.status,
        progress: job.progress,
        downloadUrl: job.downloadUrl,
        error: job.error,
    });
});

/**
 * GET /api/render/download/:filename
 * Download a rendered video
 */
router.get('/download/:filename', (req, res) => {
    const { filename } = req.params;

    // Sanitize filename to prevent directory traversal
    const sanitized = path.basename(filename);
    const filePath = getVideoPath(sanitized);

    if (!filePath) {
        return res.status(404).json({ error: 'Video not found' });
    }

    res.download(filePath, sanitized);
});

/**
 * Process render job (runs in background)
 */
async function processRenderJob(
    jobId: string,
    data: z.infer<typeof renderRequestSchema>
) {
    const job = renderJobs.get(jobId)!;
    job.status = 'rendering';
    job.progress = 5;

    try {
        const downloadUrl = await renderVideo(
            jobId,
            data as RenderOptions,
            (progress) => {
                job.progress = Math.max(5, Math.min(95, progress));
            }
        );

        job.status = 'completed';
        job.progress = 100;
        job.downloadUrl = downloadUrl;
    } catch (error: any) {
        job.status = 'failed';
        job.error = error.message || 'Render failed';
        throw error;
    }
}

export { router as renderRoutes };
