/**
 * CodeSnippet Utils
 * 
 * Shared utilities and types for the CodeSnippet platform.
 */

// Video configuration
export interface VideoConfig {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
}

export const DEFAULT_VIDEO_CONFIG: VideoConfig = {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 150, // 5 seconds
};

// Render request types
export interface RenderRequest {
    code: string;
    language: 'javascript' | 'typescript' | 'jsx' | 'tsx';
    themeId: string;
    animationType: 'typing' | 'entrance' | 'glow';
    animationConfig?: Record<string, unknown>;
    showLineNumbers: boolean;
    showWatermark: boolean;
    outputFormat: 'mp4' | 'webm';
}

export interface RenderResponse {
    jobId: string;
    status: 'queued' | 'rendering' | 'completed' | 'failed';
    progress?: number;
    downloadUrl?: string;
    error?: string;
}

// User plan types
export type PlanType = 'free' | 'pro' | 'agency';

export interface PlanLimits {
    videosPerDay: number;
    maxResolution: '720p' | '1080p';
    watermark: boolean;
    customBranding: boolean;
    apiAccess: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    free: {
        videosPerDay: 1,
        maxResolution: '720p',
        watermark: true,
        customBranding: false,
        apiAccess: false,
    },
    pro: {
        videosPerDay: 10,
        maxResolution: '1080p',
        watermark: false,
        customBranding: false,
        apiAccess: false,
    },
    agency: {
        videosPerDay: Infinity,
        maxResolution: '1080p',
        watermark: false,
        customBranding: true,
        apiAccess: true,
    },
};

// Code language utilities
export function detectLanguage(code: string): 'javascript' | 'typescript' | 'jsx' | 'tsx' {
    // Simple detection based on patterns
    const hasJsx = /<[A-Z][a-zA-Z]*/.test(code) || /<\/[a-zA-Z]+>/.test(code);
    const hasTypeScript = /:\s*(string|number|boolean|any|void|never)/.test(code) ||
        /interface\s+\w+/.test(code) ||
        /type\s+\w+\s*=/.test(code) ||
        /<\w+>/.test(code);

    if (hasTypeScript && hasJsx) return 'tsx';
    if (hasTypeScript) return 'typescript';
    if (hasJsx) return 'jsx';
    return 'javascript';
}

// Code formatting utilities
export function countLines(code: string): number {
    return code.split('\n').length;
}

export function estimateVideoDuration(
    code: string,
    animationType: string,
    fps: number = 30
): number {
    const charCount = code.length;

    switch (animationType) {
        case 'typing':
            // 2 chars per frame + 1 second buffer
            return Math.ceil(charCount / 2) + fps;
        case 'entrance':
            // 1 second entrance + 2 seconds display
            return fps * 3;
        case 'glow':
            // Just display with glow for 3 seconds
            return fps * 3;
        default:
            return fps * 3;
    }
}

// Validation
export function validateCode(code: string): { valid: boolean; error?: string } {
    if (!code || code.trim().length === 0) {
        return { valid: false, error: 'Code cannot be empty' };
    }

    if (code.length > 5000) {
        return { valid: false, error: 'Code must be less than 5000 characters' };
    }

    const lines = countLines(code);
    if (lines > 50) {
        return { valid: false, error: 'Code must be less than 50 lines for optimal video display' };
    }

    return { valid: true };
}
