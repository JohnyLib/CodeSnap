/**
 * CodeSnippet Theme System - Type Definitions
 */

export interface SyntaxColors {
    keyword: string;
    string: string;
    number: string;
    comment: string;
    function: string;
    variable: string;
    operator: string;
    punctuation: string;
    className: string;
    parameter: string;
    property: string;
    tag: string;
    attribute: string;
    constant: string;
    regex: string;
}

export interface CodeWindowStyle {
    backgroundColor: string;
    borderRadius: string;
    shadow: string;
    glow: string;
    glowColor: string;
    padding: string;
    border: string;
}

export interface WindowChromeStyle {
    show: boolean;
    backgroundColor: string;
    height: string;
    buttonColors: {
        close: string;
        minimize: string;
        maximize: string;
    };
}

export interface CodeTheme {
    id: string;
    name: string;
    description: string;

    // Core colors
    background: string;
    foreground: string;
    accent: string;

    // Typography
    fontFamily: string;
    fontSize: string;
    lineHeight: string;

    // Code window styling
    codeWindow: CodeWindowStyle;

    // Window chrome (macOS dots)
    windowChrome: WindowChromeStyle;

    // Syntax highlighting
    syntax: SyntaxColors;

    // Line numbers
    lineNumbers: {
        show: boolean;
        color: string;
        backgroundColor: string;
    };

    // Cursor
    cursor: {
        color: string;
        blinkDuration: number; // in frames at 30fps
    };
}

export interface ThemeConfig {
    themes: CodeTheme[];
    defaultTheme: string;
}

export type ThemeId = 'revorgs-bronze' | 'midnight-blue' | 'forest-green' | 'sunset-orange';
