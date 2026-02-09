/**
 * Entrance Animation
 * 
 * Fade + Slide + Scale animation for code container entrance.
 * Uses Remotion's interpolate and spring for smooth easing.
 */

import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import type { EntranceAnimationConfig } from './types';

export const defaultEntranceConfig: EntranceAnimationConfig = {
    type: 'entrance',
    fadeIn: true,
    slideFrom: 'bottom',
    slideDistance: 80,
    scale: true,
    scaleFrom: 0.95,
    duration: 30, // 1 second at 30fps
    delay: 0,
};

/**
 * Hook to get entrance animation values
 */
export function useEntranceAnimation(
    config: Partial<EntranceAnimationConfig> = {}
): {
    opacity: number;
    transform: string;
    style: React.CSSProperties;
} {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const finalConfig = { ...defaultEntranceConfig, ...config };

    const delayedFrame = Math.max(0, frame - (finalConfig.delay || 0));

    // Use spring for smooth animation
    const springValue = spring({
        frame: delayedFrame,
        fps,
        config: {
            damping: 20,
            stiffness: 100,
            mass: 0.8,
        },
    });

    // Calculate opacity
    const opacity = finalConfig.fadeIn
        ? interpolate(springValue, [0, 1], [0, 1])
        : 1;

    // Calculate slide transform
    const slideTransform = getSlideTransform(
        finalConfig.slideFrom,
        finalConfig.slideDistance,
        springValue
    );

    // Calculate scale
    const scale = finalConfig.scale
        ? interpolate(springValue, [0, 1], [finalConfig.scaleFrom, 1])
        : 1;

    const transform = `${slideTransform} scale(${scale})`;

    return {
        opacity,
        transform,
        style: {
            opacity,
            transform,
        },
    };
}

function getSlideTransform(
    direction: 'bottom' | 'top' | 'left' | 'right',
    distance: number,
    progress: number
): string {
    const remainingDistance = interpolate(progress, [0, 1], [distance, 0]);

    switch (direction) {
        case 'bottom':
            return `translateY(${remainingDistance}px)`;
        case 'top':
            return `translateY(-${remainingDistance}px)`;
        case 'left':
            return `translateX(-${remainingDistance}px)`;
        case 'right':
            return `translateX(${remainingDistance}px)`;
    }
}

/**
 * Calculate duration for entrance animation
 */
export function calculateEntranceDuration(
    config: Partial<EntranceAnimationConfig> = {}
): number {
    const finalConfig = { ...defaultEntranceConfig, ...config };
    return (finalConfig.duration || 30) + (finalConfig.delay || 0);
}
