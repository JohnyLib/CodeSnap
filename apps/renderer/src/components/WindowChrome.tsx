/**
 * WindowChrome Component
 * 
 * macOS-style window header with traffic light buttons.
 */

import React from 'react';
import type { CodeTheme } from '@codesnippet/themes';

interface WindowChromeProps {
    theme: CodeTheme;
    title?: string;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({
    theme,
    title,
}) => {
    const { windowChrome } = theme;

    return (
        <div
            style={{
                backgroundColor: windowChrome.backgroundColor,
                height: windowChrome.height,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '8px',
                borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
            }}
        >
            {/* Traffic light buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <TrafficButton color={windowChrome.buttonColors.close} />
                <TrafficButton color={windowChrome.buttonColors.minimize} />
                <TrafficButton color={windowChrome.buttonColors.maximize} />
            </div>

            {/* Optional title */}
            {title && (
                <span
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '13px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                >
                    {title}
                </span>
            )}
        </div>
    );
};

const TrafficButton: React.FC<{ color: string }> = ({ color }) => (
    <div
        style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 1px rgba(0, 0, 0, 0.3)`,
        }}
    />
);
