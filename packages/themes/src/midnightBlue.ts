/**
 * Midnight Blue Theme
 * 
 * Deep blue theme with electric blue accents.
 */

import type { CodeTheme } from './types';

export const midnightBlue: CodeTheme = {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: 'Deep blue theme with electric accents',

    background: '#0A0E1A',
    foreground: '#E4E8F4',
    accent: '#3B82F6',

    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    fontSize: '18px',
    lineHeight: '1.6',

    codeWindow: {
        backgroundColor: '#111827',
        borderRadius: '16px',
        shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        glow: '0 0 60px rgba(59, 130, 246, 0.2)',
        glowColor: 'rgba(59, 130, 246, 0.2)',
        padding: '32px',
        border: '1px solid rgba(59, 130, 246, 0.3)',
    },

    windowChrome: {
        show: true,
        backgroundColor: '#1E293B',
        height: '40px',
        buttonColors: {
            close: '#FF5F56',
            minimize: '#FFBD2E',
            maximize: '#27CA40',
        },
    },

    syntax: {
        keyword: '#818CF8',
        string: '#34D399',
        number: '#FBBF24',
        comment: '#64748B',
        function: '#60A5FA',
        variable: '#E4E8F4',
        operator: '#67E8F9',
        punctuation: '#94A3B8',
        className: '#C084FC',
        parameter: '#FCD34D',
        property: '#2DD4BF',
        tag: '#FB7185',
        attribute: '#C084FC',
        constant: '#FBBF24',
        regex: '#22D3EE',
    },

    lineNumbers: {
        show: true,
        color: '#475569',
        backgroundColor: 'transparent',
    },

    cursor: {
        color: '#3B82F6',
        blinkDuration: 15,
    },
};
