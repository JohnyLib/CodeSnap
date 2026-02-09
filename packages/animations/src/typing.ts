/**
 * Typing Animation
 * 
 * Reveals code character-by-character with a blinking cursor.
 * Uses Remotion's useCurrentFrame for frame-based animation.
 */

import { useCurrentFrame } from 'remotion';
import type { TypingAnimationConfig } from './types';

export const defaultTypingConfig: TypingAnimationConfig = {
    type: 'typing',
    charsPerFrame: 2,
    showCursor: true,
    cursorBlinkFrames: 15, // Blink every 0.5s at 30fps
    delay: 0,
};

/**
 * Hook to get the visible portion of code based on current frame
 */
export function useTypingAnimation(
    code: string,
    config: Partial<TypingAnimationConfig> = {}
): {
    visibleCode: string;
    cursorVisible: boolean;
    isComplete: boolean;
    progress: number;
} {
    const frame = useCurrentFrame();
    const finalConfig = { ...defaultTypingConfig, ...config };

    const delayedFrame = Math.max(0, frame - (finalConfig.delay || 0));
    const totalChars = code.length;
    const visibleChars = Math.min(
        totalChars,
        Math.floor(delayedFrame * finalConfig.charsPerFrame)
    );

    const visibleCode = code.slice(0, visibleChars);
    const isComplete = visibleChars >= totalChars;

    // Cursor blinks when typing is complete
    const cursorVisible = finalConfig.showCursor && (
        !isComplete ||
        Math.floor(delayedFrame / finalConfig.cursorBlinkFrames) % 2 === 0
    );

    const progress = totalChars > 0 ? visibleChars / totalChars : 1;

    return {
        visibleCode,
        cursorVisible,
        isComplete,
        progress,
    };
}

/**
 * Calculate total frames needed for typing animation
 */
export function calculateTypingDuration(
    codeLength: number,
    config: Partial<TypingAnimationConfig> = {}
): number {
    const finalConfig = { ...defaultTypingConfig, ...config };
    const typingFrames = Math.ceil(codeLength / finalConfig.charsPerFrame);
    // Add some frames for cursor blink at the end
    return typingFrames + (finalConfig.delay || 0) + 30;
}

/**
 * Get cursor style for rendering
 */
export function getCursorStyle(
    visible: boolean,
    cursorColor: string
): React.CSSProperties {
    return {
        display: 'inline-block',
        width: '2px',
        height: '1.2em',
        backgroundColor: cursorColor,
        marginLeft: '2px',
        opacity: visible ? 1 : 0,
        verticalAlign: 'text-bottom',
    };
}
