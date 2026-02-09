/**
 * Animation Selector Component
 * 
 * Picker for animation presets.
 */

import type { AnimationPreset } from '@codesnippet/animations';

interface AnimationSelectorProps {
    animations: AnimationPreset[];
    selected: string;
    onSelect: (animationId: string) => void;
}

export const AnimationSelector = ({
    animations,
    selected,
    onSelect,
}: AnimationSelectorProps) => {
    return (
        <div className="space-y-2">
            {animations.map((animation) => (
                <button
                    key={animation.id}
                    onClick={() => onSelect(animation.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${selected === animation.id
                            ? 'bg-graphite-700 border-2 border-bronze-500'
                            : 'bg-graphite-700/50 border-2 border-transparent hover:border-graphite-600'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{animation.icon}</span>
                        <div>
                            <div className="text-sm font-medium">{animation.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{animation.description}</div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};
