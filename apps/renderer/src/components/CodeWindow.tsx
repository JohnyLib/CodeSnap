/**
 * CodeWindow Component
 * 
 * The main code display component with macOS window chrome,
 * syntax highlighting, and animation support.
 */

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import type { CodeTheme } from '@codesnippet/themes';
import {
    useTypingAnimation,
    useEntranceAnimation,
    useGlowAnimation,
    getCursorStyle,
    combineWithGlow,
} from '@codesnippet/animations';
import { WindowChrome } from './WindowChrome';

interface CodeWindowProps {
    code: string;
    language: 'javascript' | 'typescript' | 'jsx' | 'tsx';
    theme: CodeTheme;
    animationType: 'typing' | 'entrance' | 'glow';
    animationConfig?: Record<string, unknown>;
    showLineNumbers: boolean;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
    code,
    language,
    theme,
    animationType,
    animationConfig,
    showLineNumbers,
}) => {
    // Get animation values based on type
    const typingAnim = useTypingAnimation(code, animationType === 'typing' ? animationConfig : { charsPerFrame: 0 });
    const entranceAnim = useEntranceAnimation(animationType === 'entrance' ? animationConfig : { duration: 0 });
    const glowAnim = useGlowAnimation(animationType === 'glow' ? { ...animationConfig, color: theme.codeWindow.glowColor } : { intensity: 0 });

    // Determine displayed code
    const displayedCode = animationType === 'typing' ? typingAnim.visibleCode : code;

    // Build container styles
    const containerStyle: React.CSSProperties = {
        backgroundColor: theme.codeWindow.backgroundColor,
        borderRadius: theme.codeWindow.borderRadius,
        border: theme.codeWindow.border,
        boxShadow: animationType === 'glow'
            ? combineWithGlow(theme.codeWindow.shadow, glowAnim.boxShadow)
            : theme.codeWindow.shadow,
        overflow: 'hidden',
        width: '100%',
        maxWidth: '960px',
        ...(animationType === 'entrance' ? entranceAnim.style : {}),
    };

    // Map language for Prism
    const prismLanguage = language === 'jsx' || language === 'tsx' ? 'tsx' : language;

    return (
        <div style={containerStyle}>
            {/* macOS Window Chrome */}
            {theme.windowChrome.show && (
                <WindowChrome theme={theme} />
            )}

            {/* Code Content */}
            <div
                style={{
                    padding: theme.codeWindow.padding,
                    fontFamily: theme.fontFamily,
                    fontSize: theme.fontSize,
                    lineHeight: theme.lineHeight,
                }}
            >
                <Highlight
                    theme={themes.nightOwl}
                    code={displayedCode}
                    language={prismLanguage}
                >
                    {({ tokens, getLineProps, getTokenProps }) => (
                        <pre
                            style={{
                                margin: 0,
                                padding: 0,
                                background: 'transparent',
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                lineHeight: 'inherit',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })} style={{ display: 'flex' }}>
                                    {/* Line number */}
                                    {showLineNumbers && (
                                        <span
                                            style={{
                                                color: theme.lineNumbers.color,
                                                backgroundColor: theme.lineNumbers.backgroundColor,
                                                paddingRight: '24px',
                                                userSelect: 'none',
                                                textAlign: 'right',
                                                minWidth: '40px',
                                                opacity: 0.6,
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                    )}

                                    {/* Code tokens */}
                                    <span>
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({ token })}
                                                style={{
                                                    ...getTokenProps({ token }).style,
                                                    color: getTokenColor(token.types, theme),
                                                }}
                                            />
                                        ))}
                                    </span>
                                </div>
                            ))}

                            {/* Typing cursor */}
                            {animationType === 'typing' && typingAnim.cursorVisible && (
                                <span style={getCursorStyle(true, theme.cursor.color)} />
                            )}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    );
};

/**
 * Map Prism token types to theme colors
 */
function getTokenColor(types: string[], theme: CodeTheme): string {
    const typeMap: Record<string, keyof typeof theme.syntax> = {
        'keyword': 'keyword',
        'string': 'string',
        'number': 'number',
        'comment': 'comment',
        'function': 'function',
        'variable': 'variable',
        'operator': 'operator',
        'punctuation': 'punctuation',
        'class-name': 'className',
        'parameter': 'parameter',
        'property': 'property',
        'tag': 'tag',
        'attr-name': 'attribute',
        'constant': 'constant',
        'regex': 'regex',
        'builtin': 'function',
        'boolean': 'constant',
    };

    for (const type of types) {
        const mappedType = typeMap[type];
        if (mappedType && theme.syntax[mappedType]) {
            return theme.syntax[mappedType];
        }
    }

    return theme.foreground;
}
