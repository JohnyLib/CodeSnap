/**
 * Theme Selector Component
 * 
 * Visual picker for code video themes.
 */

import type { CodeTheme } from '@codesnippet/themes';

interface ThemeSelectorProps {
    themes: CodeTheme[];
    selected: string;
    onSelect: (themeId: string) => void;
}

export const ThemeSelector = ({
    themes,
    selected,
    onSelect,
}: ThemeSelectorProps) => {
    return (
        <div className="space-y-2">
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => onSelect(theme.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${selected === theme.id
                            ? 'bg-graphite-700 border-2 border-bronze-500'
                            : 'bg-graphite-700/50 border-2 border-transparent hover:border-graphite-600'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {/* Color preview */}
                        <div
                            className="w-10 h-10 rounded-lg border border-graphite-600"
                            style={{
                                background: `linear-gradient(135deg, ${theme.background} 50%, ${theme.accent} 50%)`,
                            }}
                        />
                        <div>
                            <div className="text-sm font-medium">{theme.name}</div>
                            <div className="text-xs text-gray-500">{theme.description}</div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};
