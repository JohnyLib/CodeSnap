/**
 * Watermark Component
 * 
 * Branding watermark for free tier videos.
 * Subtle but visible watermark in corner.
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import type { CodeTheme } from '@codesnippet/themes';

interface WatermarkProps {
    theme: CodeTheme;
    text?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const Watermark: React.FC<WatermarkProps> = ({
    theme,
    text = 'Made with CodeSnippet',
    position = 'bottom-right',
}) => {
    const frame = useCurrentFrame();

    // Fade in the watermark
    const opacity = interpolate(frame, [0, 15], [0, 0.6], {
        extrapolateRight: 'clamp',
    });

    const positionStyles = getPositionStyles(position);

    return (
        <AbsoluteFill
            style={{
                pointerEvents: 'none',
                ...positionStyles,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    opacity,
                    backdropFilter: 'blur(4px)',
                }}
            >
                {/* Logo icon */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>

                {/* Text */}
                <span
                    style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '14px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 500,
                    }}
                >
                    {text}
                </span>
            </div>
        </AbsoluteFill>
    );
};

function getPositionStyles(
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
): React.CSSProperties {
    const base: React.CSSProperties = {
        display: 'flex',
        padding: '40px',
    };

    switch (position) {
        case 'bottom-right':
            return { ...base, justifyContent: 'flex-end', alignItems: 'flex-end' };
        case 'bottom-left':
            return { ...base, justifyContent: 'flex-start', alignItems: 'flex-end' };
        case 'top-right':
            return { ...base, justifyContent: 'flex-end', alignItems: 'flex-start' };
        case 'top-left':
            return { ...base, justifyContent: 'flex-start', alignItems: 'flex-start' };
    }
}
