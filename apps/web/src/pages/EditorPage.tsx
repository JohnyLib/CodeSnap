/**
 * Editor Page
 * 
 * Main code editing and video generation interface.
 * Includes Monaco editor, theme/animation selectors, and video preview.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CodeEditor } from '../components/CodeEditor';
import { ThemeSelector } from '../components/ThemeSelector';
import { AnimationSelector } from '../components/AnimationSelector';
import { VideoPreview } from '../components/VideoPreview';
import { RenderProgress } from '../components/RenderProgress';
import { getAllThemes } from '@codesnippet/themes';
import { getAllAnimationPresets } from '@codesnippet/animations';

const API_URL = 'http://localhost:3001';

const defaultCode = `// Your amazing code here
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`;

export const EditorPage = () => {
    const [code, setCode] = useState(defaultCode);
    const [selectedTheme, setSelectedTheme] = useState('revorgs-bronze');
    const [selectedAnimation, setSelectedAnimation] = useState('typing');
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [isRendering, setIsRendering] = useState(false);
    const [renderProgress, setRenderProgress] = useState(0);
    const [outputFormat, setOutputFormat] = useState<'mp4' | 'webm'>('mp4');
    const [renderError, setRenderError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const themes = useMemo(() => getAllThemes(), []);
    const animations = useMemo(() => getAllAnimationPresets(), []);

    const handleRender = async () => {
        setIsRendering(true);
        setRenderProgress(0);
        setRenderError(null);
        setDownloadUrl(null);
        setStatusMessage('Starting render...');

        try {
            // Start render job via API
            const response = await fetch(`${API_URL}/api/render`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    language: 'typescript',
                    themeId: selectedTheme,
                    animationType: selectedAnimation,
                    showLineNumbers,
                    showWatermark: false, // Free for all - no watermark!
                    outputFormat,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to start render job');
            }

            const { jobId } = await response.json();
            setStatusMessage('Bundling Remotion project...');

            // Poll for progress
            let pollCount = 0;
            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await fetch(`${API_URL}/api/render/${jobId}`);
                    const status = await statusRes.json();

                    setRenderProgress(status.progress || 0);

                    // Update status message based on progress
                    if (status.progress < 20) {
                        setStatusMessage('Bundling Remotion project...');
                    } else if (status.progress < 50) {
                        setStatusMessage('Rendering frames...');
                    } else if (status.progress < 90) {
                        setStatusMessage('Encoding video...');
                    } else {
                        setStatusMessage('Finalizing...');
                    }

                    if (status.status === 'completed') {
                        clearInterval(pollInterval);
                        setIsRendering(false);
                        setStatusMessage('');

                        // Build full download URL
                        const fullDownloadUrl = `${API_URL}${status.downloadUrl}`;
                        setDownloadUrl(fullDownloadUrl);

                        // Auto-download
                        triggerDownload(fullDownloadUrl, `codesnippet-${jobId}.${outputFormat}`);
                    } else if (status.status === 'failed') {
                        clearInterval(pollInterval);
                        setIsRendering(false);
                        setStatusMessage('');
                        setRenderError(status.error || 'Render failed');
                    }

                    pollCount++;
                    if (pollCount > 600) { // 5 minute timeout
                        clearInterval(pollInterval);
                        setIsRendering(false);
                        setRenderError('Render timed out');
                    }
                } catch (err) {
                    // Continue polling on network errors
                    console.log('Poll error, retrying...');
                }
            }, 500);

        } catch (error) {
            console.error('Render error:', error);
            setRenderError('Could not connect to render server. Make sure the API is running on port 3001.');
            setIsRendering(false);
            setStatusMessage('');
        }
    };

    const triggerDownload = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = () => {
        if (downloadUrl) {
            triggerDownload(downloadUrl, `codesnippet-video.${outputFormat}`);
        }
    };

    return (
        <main className="pt-20 min-h-screen">
            <div className="max-w-[1600px] mx-auto p-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold mb-2">Create Your Video</h1>
                    <p className="text-gray-400">Paste your code, customize the style, and generate your video.</p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Editor */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* Code Editor */}
                        <div className="bg-graphite-800/50 rounded-2xl border border-graphite-700/50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-graphite-700/50 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-300">Code Editor</span>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-sm text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={showLineNumbers}
                                            onChange={(e) => setShowLineNumbers(e.target.checked)}
                                            className="rounded border-graphite-600 bg-graphite-700 text-bronze-500 focus:ring-bronze-500"
                                        />
                                        Line numbers
                                    </label>
                                </div>
                            </div>
                            <CodeEditor
                                value={code}
                                onChange={setCode}
                                language="typescript"
                            />
                        </div>

                        {/* Options */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Theme Selector */}
                            <div className="bg-graphite-800/50 rounded-2xl border border-graphite-700/50 p-4">
                                <h3 className="text-sm font-medium text-gray-300 mb-3">Theme</h3>
                                <ThemeSelector
                                    themes={themes}
                                    selected={selectedTheme}
                                    onSelect={setSelectedTheme}
                                />
                            </div>

                            {/* Animation Selector */}
                            <div className="bg-graphite-800/50 rounded-2xl border border-graphite-700/50 p-4">
                                <h3 className="text-sm font-medium text-gray-300 mb-3">Animation</h3>
                                <AnimationSelector
                                    animations={animations}
                                    selected={selectedAnimation}
                                    onSelect={setSelectedAnimation}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Video Preview */}
                        <div className="bg-graphite-800/50 rounded-2xl border border-graphite-700/50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-graphite-700/50">
                                <span className="text-sm font-medium text-gray-300">Preview</span>
                            </div>
                            <div className="p-4">
                                <VideoPreview
                                    code={code}
                                    themeId={selectedTheme}
                                    animationType={selectedAnimation}
                                    showLineNumbers={showLineNumbers}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {renderError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                <strong>Error:</strong> {renderError}
                            </div>
                        )}

                        {/* Download Success */}
                        {downloadUrl && !isRendering && (
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-400 text-sm">✅ Video generated successfully!</span>
                                    <button
                                        onClick={handleDownload}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                    >
                                        Download Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Render Button or Progress */}
                        {isRendering ? (
                            <RenderProgress progress={renderProgress} statusMessage={statusMessage} />
                        ) : (
                            <button
                                onClick={handleRender}
                                disabled={!code.trim()}
                                className="w-full py-4 bg-gradient-to-r from-bronze-500 to-bronze-600 text-white rounded-xl font-semibold text-lg hover:from-bronze-600 hover:to-bronze-700 transition-all shadow-xl shadow-bronze-500/25 hover:shadow-bronze-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Generate Video
                            </button>
                        )}

                        {/* Format Options */}
                        <div className="bg-graphite-800/50 rounded-2xl border border-graphite-700/50 p-4">
                            <h3 className="text-sm font-medium text-gray-300 mb-3">Output Settings</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <label
                                    className={`flex items-center gap-2 p-3 bg-graphite-700/50 rounded-xl cursor-pointer border-2 transition-colors ${outputFormat === 'mp4' ? 'border-bronze-500' : 'border-transparent hover:border-graphite-600'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="format"
                                        value="mp4"
                                        checked={outputFormat === 'mp4'}
                                        onChange={() => setOutputFormat('mp4')}
                                        className="text-bronze-500 focus:ring-bronze-500"
                                    />
                                    <span className="text-sm">MP4 (H.264)</span>
                                </label>
                                <label
                                    className={`flex items-center gap-2 p-3 bg-graphite-700/50 rounded-xl cursor-pointer border-2 transition-colors ${outputFormat === 'webm' ? 'border-bronze-500' : 'border-transparent hover:border-graphite-600'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="format"
                                        value="webm"
                                        checked={outputFormat === 'webm'}
                                        onChange={() => setOutputFormat('webm')}
                                        className="text-bronze-500 focus:ring-bronze-500"
                                    />
                                    <span className="text-sm">WebM (VP8)</span>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                MP4 is recommended for TikTok and Instagram. WebM for web use.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};
