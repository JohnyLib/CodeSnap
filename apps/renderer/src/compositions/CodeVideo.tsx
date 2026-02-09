/**
 * CodeVideo Composition
 * 
 * Main Remotion composition for rendering code videos.
 * Supports typing, entrance, and glow animations.
 */

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { getTheme } from '@codesnippet/themes';
import { CodeWindow } from '../components/CodeWindow';
import { BackgroundEffects } from '../components/BackgroundEffects';
import { Watermark } from '../components/Watermark';

export interface CodeVideoProps {
    code: string;
    language: 'javascript' | 'typescript' | 'jsx' | 'tsx';
    themeId: string;
    animationType: 'typing' | 'entrance' | 'glow';
    showLineNumbers: boolean;
    showWatermark: boolean;
    animationConfig?: Record<string, unknown>;
}

export const CodeVideoComposition: React.FC<CodeVideoProps> = ({
    code,
    language,
    themeId,
    animationType,
    showLineNumbers,
    showWatermark,
    animationConfig,
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const theme = getTheme(themeId);

    return (
        <AbsoluteFill
            style={{
                background: theme.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 60,
            }}
        >
            {/* Background effects layer */}
            <BackgroundEffects theme={theme} />

            {/* Code window */}
            <CodeWindow
                code={code}
                language={language}
                theme={theme}
                animationType={animationType}
                animationConfig={animationConfig}
                showLineNumbers={showLineNumbers}
            />

            {/* Watermark layer (for free tier) */}
            {showWatermark && <Watermark theme={theme} />}
        </AbsoluteFill>
    );
};
