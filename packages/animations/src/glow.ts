/**
 * Glow Pulse Animation
 * 
 * Subtle animated glow effect that pulses continuously.
 * Creates an ambient, premium feel around the code container.
 */

import { useCurrentFrame, interpolate } from 'remotion';
import type { GlowAnimationConfig } from './types';

export const defaultGlowConfig: GlowAnimationConfig = {
    type: 'glow',
    intensity: 1.5,
    pulseFrames: 60, // 2 second cycle at 30fps
    color: 'rgba(184, 115, 51, 0.3)', // Bronze glow
    delay: 0,
};

/**
 * Hook to get glow animation values
 */
export function useGlowAnimation(
    config: Partial<GlowAnimationConfig> = {}
): {
    glowIntensity: number;
    glowStyle: React.CSSProperties;
    boxShadow: string;
} {
    const frame = useCurrentFrame();
    const finalConfig = { ...defaultGlowConfig, ...config };

    const delayedFrame = Math.max(0, frame - (finalConfig.delay || 0));

    // Create a smooth sine wave for pulsing
    const cycleProgress = (delayedFrame % finalConfig.pulseFrames) / finalConfig.pulseFrames;
    const pulseValue = Math.sin(cycleProgress * Math.PI * 2);

    // Map sine wave (-1 to 1) to intensity range (0.5 to 1.5 * intensity)
    const glowIntensity = interpolate(
        pulseValue,
        [-1, 1],
        [0.5, finalConfig.intensity]
    );

    // Parse color and apply intensity
    const boxShadow = createGlowBoxShadow(finalConfig.color, glowIntensity);

    return {
        glowIntensity,
        glowStyle: {
            boxShadow,
            transition: 'box-shadow 0.1s ease-out',
        },
        boxShadow,
    };
}

/**
 * Create layered box-shadow for glow effect
 */
function createGlowBoxShadow(color: string, intensity: number): string {
    // Extract RGBA components
    const baseAlpha = parseAlpha(color);
    const colorWithoutAlpha = color.replace(/[\d.]+\)$/, '');

    // Create multiple layers for a softer, more diffused glow
    const layers = [
        `0 0 ${20 * intensity}px ${colorWithoutAlpha}${baseAlpha * intensity * 0.5})`,
        `0 0 ${40 * intensity}px ${colorWithoutAlpha}${baseAlpha * intensity * 0.3})`,
        `0 0 ${60 * intensity}px ${colorWithoutAlpha}${baseAlpha * intensity * 0.2})`,
        `0 0 ${80 * intensity}px ${colorWithoutAlpha}${baseAlpha * intensity * 0.1})`,
    ];

    return layers.join(', ');
}

function parseAlpha(color: string): number {
    const match = color.match(/([\d.]+)\)$/);
    return match ? parseFloat(match[1]) : 1;
}

/**
 * Combine glow with existing box-shadow
 */
export function combineWithGlow(
    existingShadow: string,
    glowShadow: string
): string {
    if (!existingShadow || existingShadow === 'none') {
        return glowShadow;
    }
    return `${existingShadow}, ${glowShadow}`;
}
