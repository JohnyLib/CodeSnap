/**
 * CodeSnippet Animation System
 * 
 * Reusable animation presets for Remotion video compositions.
 */

// Types
export type {
    AnimationType,
    AnimationConfig,
    TypingAnimationConfig,
    EntranceAnimationConfig,
    GlowAnimationConfig,
    AnimationPreset,
} from './types';

// Typing Animation
export {
    useTypingAnimation,
    calculateTypingDuration,
    getCursorStyle,
    defaultTypingConfig,
} from './typing';

// Entrance Animation
export {
    useEntranceAnimation,
    calculateEntranceDuration,
    defaultEntranceConfig,
} from './entrance';

// Glow Animation
export {
    useGlowAnimation,
    defaultGlowConfig,
    combineWithGlow,
} from './glow';

// Presets
import type { AnimationPreset } from './types';

export const animationPresets: AnimationPreset[] = [
    {
        id: 'typing',
        name: 'Typing',
        description: 'Code appears character-by-character with a blinking cursor',
        icon: '⌨️',
        config: {
            type: 'typing',
            charsPerFrame: 2,
            showCursor: true,
            cursorBlinkFrames: 15,
        },
    },
    {
        id: 'entrance',
        name: 'Entrance',
        description: 'Smooth fade-in with slide and scale effect',
        icon: '✨',
        config: {
            type: 'entrance',
            fadeIn: true,
            slideFrom: 'bottom',
            slideDistance: 80,
            scale: true,
            scaleFrom: 0.95,
            duration: 30,
        },
    },
    {
        id: 'glow',
        name: 'Glow Pulse',
        description: 'Ambient glow effect that pulses continuously',
        icon: '💫',
        config: {
            type: 'glow',
            intensity: 1.5,
            pulseFrames: 60,
            color: 'rgba(184, 115, 51, 0.3)',
        },
    },
];

/**
 * Get animation preset by ID
 */
export function getAnimationPreset(id: string): AnimationPreset | undefined {
    return animationPresets.find(preset => preset.id === id);
}

/**
 * Get all animation presets
 */
export function getAllAnimationPresets(): AnimationPreset[] {
    return animationPresets;
}
