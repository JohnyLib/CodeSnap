/**
 * RevOrgs Bronze Theme
 * 
 * Premium dark theme with bronze/copper accents.
 * - Dark graphite background (#0B0B0B)
 * - Bronze/copper accent (#B87333)
 * - JetBrains Mono font
 * - Soft glow effects
 */

import type { CodeTheme } from './types';

export const revorgsBronze: CodeTheme = {
    id: 'revorgs-bronze',
    name: 'RevOrgs Bronze',
    description: 'Premium dark theme with bronze/copper accents',

    // Core colors
    background: '#0B0B0B',
    foreground: '#E8E6E3',
    accent: '#B87333',

    // Typography
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    fontSize: '18px',
    lineHeight: '1.6',

    // Code window styling
    codeWindow: {
        backgroundColor: '#151515',
        borderRadius: '16px',
        shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        glow: '0 0 60px rgba(184, 115, 51, 0.15)',
        glowColor: 'rgba(184, 115, 51, 0.15)',
        padding: '32px',
        border: '1px solid rgba(184, 115, 51, 0.2)',
    },

    // Window chrome (macOS dots)
    windowChrome: {
        show: true,
        backgroundColor: '#1C1C1C',
        height: '40px',
        buttonColors: {
            close: '#FF5F56',
            minimize: '#FFBD2E',
            maximize: '#27CA40',
        },
    },

    // Syntax highlighting - Bronze-inspired palette
    syntax: {
        keyword: '#C9956B',      // Warm bronze
        string: '#9ECE6A',       // Soft green
        number: '#FF9E64',       // Warm orange
        comment: '#565F89',      // Muted blue-gray
        function: '#7AA2F7',     // Soft blue
        variable: '#E8E6E3',     // Near white
        operator: '#89DDFF',     // Cyan
        punctuation: '#A9B1D6',  // Light blue-gray
        className: '#BB9AF7',    // Soft purple
        parameter: '#E0AF68',    // Gold
        property: '#73DACA',     // Teal
        tag: '#F7768E',          // Soft red
        attribute: '#BB9AF7',    // Soft purple
        constant: '#FF9E64',     // Warm orange
        regex: '#B4F9F8',        // Bright cyan
    },

    // Line numbers
    lineNumbers: {
        show: true,
        color: '#4A4A4A',
        backgroundColor: 'transparent',
    },

    // Cursor
    cursor: {
        color: '#B87333',
        blinkDuration: 15, // 0.5 seconds at 30fps
    },
};
