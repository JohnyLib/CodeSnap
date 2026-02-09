/**
 * Code Editor Component
 * 
 * Monaco Editor wrapper for code input.
 */

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
}

export const CodeEditor = ({
    value,
    onChange,
    language = 'typescript',
}: CodeEditorProps) => {
    return (
        <Editor
            height="400px"
            language={language}
            value={value}
            onChange={(val) => onChange(val || '')}
            theme="vs-dark"
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 2,
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'none',
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                },
            }}
        />
    );
};
