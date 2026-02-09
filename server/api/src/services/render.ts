/**
 * Render Service
 * 
 * Handles Remotion video rendering on the server.
 * Bundles the Remotion project and renders videos to MP4/WebM.
 */

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cache the bundle URL
let bundleUrl: string | null = null;

// Output directory for rendered videos
const OUTPUT_DIR = path.join(__dirname, '../../public/rendered');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export interface RenderOptions {
    code: string;
    language: 'javascript' | 'typescript' | 'jsx' | 'tsx';
    themeId: string;
    animationType: 'typing' | 'entrance' | 'glow';
    showLineNumbers: boolean;
    showWatermark: boolean;
    outputFormat: 'mp4' | 'webm';
}

/**
 * Bundle the Remotion project (cached)
 */
export async function getBundleUrl(): Promise<string> {
    if (bundleUrl) {
        return bundleUrl;
    }

    // Path from server/api/src/services/ to apps/renderer (4 levels up, then into apps/renderer)
    const rendererPath = path.resolve(__dirname, '../../../../apps/renderer');
    const entryPoint = path.join(rendererPath, 'src/index.ts');

    console.log('📦 Bundling Remotion project...');

    bundleUrl = await bundle({
        entryPoint,
        onProgress: (progress) => {
            if (progress % 20 === 0) {
                console.log(`  Bundle progress: ${progress}%`);
            }
        },
    });

    console.log('✅ Bundle complete');
    return bundleUrl;
}

/**
 * Render a video with the given options
 */
export async function renderVideo(
    jobId: string,
    options: RenderOptions,
    onProgress: (progress: number) => void
): Promise<string> {
    const bundleLocation = await getBundleUrl();

    // Select the composition
    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: 'CodeVideo',
        inputProps: {
            code: options.code,
            language: options.language,
            themeId: options.themeId,
            animationType: options.animationType,
            showLineNumbers: options.showLineNumbers,
            showWatermark: options.showWatermark,
        },
    });

    // Calculate duration based on animation type
    let durationInFrames = 150; // Default 5 seconds at 30fps
    if (options.animationType === 'typing') {
        // 2 chars per frame + 1 second buffer
        durationInFrames = Math.min(300, Math.ceil(options.code.length / 2) + 30);
    }

    // Output file path
    const outputFile = path.join(
        OUTPUT_DIR,
        `${jobId}.${options.outputFormat}`
    );

    console.log(`🎬 Rendering video: ${jobId}`);

    await renderMedia({
        composition: {
            ...composition,
            durationInFrames,
        },
        serveUrl: bundleLocation,
        codec: options.outputFormat === 'webm' ? 'vp8' : 'h264',
        outputLocation: outputFile,
        inputProps: {
            code: options.code,
            language: options.language,
            themeId: options.themeId,
            animationType: options.animationType,
            showLineNumbers: options.showLineNumbers,
            showWatermark: options.showWatermark,
        },
        onProgress: ({ progress }) => {
            onProgress(Math.round(progress * 100));
        },
    });

    console.log(`✅ Video rendered: ${outputFile}`);

    return `/rendered/${jobId}.${options.outputFormat}`;
}

/**
 * Get static file path for a rendered video
 */
export function getVideoPath(filename: string): string | null {
    const filePath = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(filePath)) {
        return filePath;
    }
    return null;
}
