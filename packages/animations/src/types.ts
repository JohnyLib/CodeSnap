/**
 * Animation Types
 */

export type AnimationType = 'typing' | 'entrance' | 'glow' | 'none';

export interface AnimationConfig {
    type: AnimationType;
    duration?: number; // in frames
    delay?: number;    // in frames
}

export interface TypingAnimationConfig extends AnimationConfig {
    type: 'typing';
    charsPerFrame: number;  // characters revealed per frame
    showCursor: boolean;
    cursorBlinkFrames: number;
}

export interface EntranceAnimationConfig extends AnimationConfig {
    type: 'entrance';
    fadeIn: boolean;
    slideFrom: 'bottom' | 'top' | 'left' | 'right';
    slideDistance: number;  // in pixels
    scale: boolean;
    scaleFrom: number;      // e.g., 0.95
}

export interface GlowAnimationConfig extends AnimationConfig {
    type: 'glow';
    intensity: number;      // multiplier for glow opacity
    pulseFrames: number;    // frames for one pulse cycle
    color: string;          // glow color
}

export interface AnimationPreset {
    id: string;
    name: string;
    description: string;
    icon: string;
    config: TypingAnimationConfig | EntranceAnimationConfig | GlowAnimationConfig;
}
