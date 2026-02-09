/**
 * BackgroundEffects Component
 * 
 * Adds subtle grain/noise and gradient effects to the video background.
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CodeTheme } from '@codesnippet/themes';

interface BackgroundEffectsProps {
    theme: CodeTheme;
    showGrain?: boolean;
    grainOpacity?: number;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
    theme,
    showGrain = true,
    grainOpacity = 0.03,
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <>
            {/* Radial gradient overlay for depth */}
            <AbsoluteFill
                style={{
                    background: `radial-gradient(
            ellipse at 50% 30%,
            ${hexToRgba(theme.accent, 0.08)} 0%,
            transparent 60%
          )`,
                    pointerEvents: 'none',
                }}
            />

            {/* Bottom gradient for grounding */}
            <AbsoluteFill
                style={{
                    background: `linear-gradient(
            to top,
            ${hexToRgba(theme.background, 0.9)} 0%,
            transparent 30%
          )`,
                    pointerEvents: 'none',
                }}
            />

            {/* Animated grain overlay */}
            {showGrain && (
                <AbsoluteFill
                    style={{
                        opacity: grainOpacity,
                        backgroundImage: generateNoisePattern(frame),
                        backgroundSize: '200px 200px',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </>
    );
};

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Generate animated noise pattern using SVG data URI
 * Creates subtle film grain effect
 */
function generateNoisePattern(frame: number): string {
    // Create a pseudo-random pattern that changes slightly each frame
    const seed = (frame % 10) * 0.1;

    // Using SVG filter for noise
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="${0.7 + seed}" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"/>
    </svg>
  `;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
