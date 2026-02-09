/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // RevOrgs brand colors
                bronze: {
                    50: '#FBF5EF',
                    100: '#F5E8DA',
                    200: '#EBD0B5',
                    300: '#DFB38B',
                    400: '#D19460',
                    500: '#B87333', // Primary bronze
                    600: '#9A5F2A',
                    700: '#7A4C22',
                    800: '#5C391A',
                    900: '#3D2611',
                },
                graphite: {
                    50: '#F5F5F5',
                    100: '#E0E0E0',
                    200: '#B8B8B8',
                    300: '#8A8A8A',
                    400: '#5C5C5C',
                    500: '#2E2E2E',
                    600: '#1C1C1C',
                    700: '#151515',
                    800: '#0F0F0F',
                    900: '#0B0B0B', // Primary background
                },
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 60px rgba(184, 115, 51, 0.15)',
                'glow-lg': '0 0 100px rgba(184, 115, 51, 0.25)',
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 40px rgba(184, 115, 51, 0.15)' },
                    '50%': { boxShadow: '0 0 80px rgba(184, 115, 51, 0.3)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
