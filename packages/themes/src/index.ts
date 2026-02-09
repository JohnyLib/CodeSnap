/**
 * CodeSnippet Theme System
 * 
 * Exports all themes and utilities for theme management.
 */

// Types
export type {
    CodeTheme,
    SyntaxColors,
    CodeWindowStyle,
    WindowChromeStyle,
    ThemeConfig,
    ThemeId,
} from './types';

// Themes
export { revorgsBronze } from './revorgsBronze';
export { midnightBlue } from './midnightBlue';

// Theme registry
import { revorgsBronze } from './revorgsBronze';
import { midnightBlue } from './midnightBlue';
import type { CodeTheme, ThemeConfig } from './types';

export const themes: Record<string, CodeTheme> = {
    'revorgs-bronze': revorgsBronze,
    'midnight-blue': midnightBlue,
};

export const themeConfig: ThemeConfig = {
    themes: Object.values(themes),
    defaultTheme: 'revorgs-bronze',
};

/**
 * Get theme by ID
 */
export function getTheme(id: string): CodeTheme {
    const theme = themes[id];
    if (!theme) {
        console.warn(`Theme "${id}" not found, falling back to default`);
        return themes[themeConfig.defaultTheme];
    }
    return theme;
}

/**
 * Get all available themes
 */
export function getAllThemes(): CodeTheme[] {
    return themeConfig.themes;
}

/**
 * Get default theme
 */
export function getDefaultTheme(): CodeTheme {
    return themes[themeConfig.defaultTheme];
}

/**
 * Apply theme CSS variables to an element
 */
export function applyThemeVariables(theme: CodeTheme): Record<string, string> {
    return {
        '--theme-background': theme.background,
        '--theme-foreground': theme.foreground,
        '--theme-accent': theme.accent,
        '--theme-font-family': theme.fontFamily,
        '--theme-font-size': theme.fontSize,
        '--theme-line-height': theme.lineHeight,
        '--theme-window-bg': theme.codeWindow.backgroundColor,
        '--theme-window-radius': theme.codeWindow.borderRadius,
        '--theme-window-shadow': theme.codeWindow.shadow,
        '--theme-window-glow': theme.codeWindow.glow,
        '--theme-window-padding': theme.codeWindow.padding,
        '--theme-window-border': theme.codeWindow.border,
        '--theme-cursor-color': theme.cursor.color,
    };
}
