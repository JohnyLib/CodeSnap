/**
 * Remotion Root
 * 
 * Registers all video compositions.
 */

import { Composition } from 'remotion';
import { CodeVideoComposition } from './compositions/CodeVideo';
import { DEFAULT_VIDEO_CONFIG } from '@codesnippet/utils';

const defaultCode = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="CodeVideo"
                component={CodeVideoComposition}
                durationInFrames={150}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    code: defaultCode,
                    language: 'typescript' as const,
                    themeId: 'revorgs-bronze',
                    animationType: 'typing' as const,
                    showLineNumbers: true,
                    showWatermark: false,
                }}
            />

            <Composition
                id="CodeVideo-Entrance"
                component={CodeVideoComposition}
                durationInFrames={90}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    code: defaultCode,
                    language: 'typescript' as const,
                    themeId: 'revorgs-bronze',
                    animationType: 'entrance' as const,
                    showLineNumbers: true,
                    showWatermark: false,
                }}
            />

            <Composition
                id="CodeVideo-Glow"
                component={CodeVideoComposition}
                durationInFrames={120}
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    code: defaultCode,
                    language: 'typescript' as const,
                    themeId: 'revorgs-bronze',
                    animationType: 'glow' as const,
                    showLineNumbers: true,
                    showWatermark: true,
                }}
            />
        </>
    );
};
