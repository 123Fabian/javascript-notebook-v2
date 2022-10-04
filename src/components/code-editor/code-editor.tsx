import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from  'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import './code-editor.css'
import './syntax.css'

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) =>{
        editorRef.current = monacoEditor;
        
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())   
        })

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {},
        )
    }

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        editorRef.current.setValue(formatted)
    }
    
    return(
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue} 
                theme="dark" 
                language="javascript" 
                height="100%"
                options={{
                    wordWrap: 'on',
                    showUnused: false,
                    fontSize: 16,
                    automaticLayout: true,
                }}
            />
        </div>
    ) 
};

export default CodeEditor