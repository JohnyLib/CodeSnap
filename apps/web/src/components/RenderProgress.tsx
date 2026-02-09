/**
 * Render Progress Component
 * 
 * Shows video rendering progress with animated bar.
 */

import { motion } from 'framer-motion';

interface RenderProgressProps {
    progress: number;
    statusMessage?: string;
}

export const RenderProgress = ({ progress, statusMessage }: RenderProgressProps) => {
    return (
        <div className="w-full p-6 bg-graphite-800/50 rounded-2xl border border-graphite-700/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-bronze-500 border-t-transparent rounded-full"
                    />
                    <span className="text-sm font-medium">Rendering video...</span>
                </div>
                <span className="text-sm text-gray-400">{progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-graphite-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-bronze-500 to-bronze-400 rounded-full relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
            </div>

            {/* Status text */}
            <p className="text-xs text-gray-500 mt-3">
                {statusMessage || getDefaultStatus(progress)}
            </p>
        </div>
    );
};

function getDefaultStatus(progress: number): string {
    if (progress < 10) return 'Preparing composition...';
    if (progress < 30) return 'Bundling Remotion project...';
    if (progress < 60) return 'Rendering frames...';
    if (progress < 90) return 'Encoding video...';
    return 'Finalizing...';
}
