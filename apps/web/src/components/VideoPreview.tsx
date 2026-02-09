/**
 * Video Preview Component
 * 
 * Shows a static preview of how the video will look.
 * Uses the same styling as Remotion compositions.
 */

import { Highlight, themes } from 'prism-react-renderer';
import { getTheme } from '@codesnippet/themes';

interface VideoPreviewProps {
    code: string;
    themeId: string;
    animationType: string;
    showLineNumbers: boolean;
}

export const VideoPreview = ({
    code,
    themeId,
    animationType,
    showLineNumbers,
}: VideoPreviewProps) => {
    const theme = getTheme(themeId);

    return (
        <div className="relative">
            {/* Phone frame mockup */}
            <div className="mx-auto w-[280px] aspect-[9/16] bg-graphite-900 rounded-[2rem] border-4 border-graphite-700 shadow-2xl overflow-hidden">
                {/* Video content */}
                <div
                    className="w-full h-full flex items-center justify-center p-4"
                    style={{ background: theme.background }}
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `radial-gradient(ellipse at 50% 30%, ${theme.accent}40 0%, transparent 60%)`,
                        }}
                    />

                    {/* Code window */}
                    <div
                        className="relative w-full max-w-[240px] rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: theme.codeWindow.backgroundColor,
                            boxShadow: theme.codeWindow.shadow,
                            border: theme.codeWindow.border,
                        }}
                    >
                        {/* Window chrome */}
                        {theme.windowChrome.show && (
                            <div
                                className="flex items-center gap-1.5 px-3 py-2"
                                style={{ backgroundColor: theme.windowChrome.backgroundColor }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.windowChrome.buttonColors.close }} />
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.windowChrome.buttonColors.minimize }} />
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.windowChrome.buttonColors.maximize }} />
                            </div>
                        )}

                        {/* Code content */}
                        <div
                            className="p-3 text-[6px] leading-relaxed overflow-hidden"
                            style={{ fontFamily: theme.fontFamily }}
                        >
                            <Highlight
                                theme={themes.nightOwl}
                                code={code.slice(0, 200)}
                                language="tsx"
                            >
                                {({ tokens, getLineProps, getTokenProps }) => (
                                    <pre className="m-0 p-0 bg-transparent whitespace-pre-wrap">
                                        {tokens.slice(0, 8).map((line, i) => (
                                            <div key={i} {...getLineProps({ line })} className="flex">
                                                {showLineNumbers && (
                                                    <span
                                                        className="pr-2 select-none opacity-40"
                                                        style={{ color: theme.lineNumbers.color }}
                                                    >
                                                        {i + 1}
                                                    </span>
                                                )}
                                                <span>
                                                    {line.map((token, key) => (
                                                        <span key={key} {...getTokenProps({ token })} />
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
                                        {tokens.length > 8 && (
                                            <div className="opacity-50 text-gray-400">...</div>
                                        )}
                                    </pre>
                                )}
                            </Highlight>
                        </div>
                    </div>
                </div>

                {/* Animation indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/50 rounded-full backdrop-blur-sm">
                    <span className="text-[8px] text-gray-300 capitalize">{animationType}</span>
                </div>
            </div>

            {/* Info text */}
            <p className="text-center text-xs text-gray-500 mt-4">
                1080 × 1920 · 30 FPS · 5 seconds
            </p>
        </div>
    );
};
