import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";
import { Cell } from "../../state";
import { useActions } from '../../hooks/use-actions'

import './text-editor.css'

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {

    const { updateCell } = useActions();

    const [ editing, setEditing ] = useState(false)
    const editorRef = useRef<HTMLDivElement | null>(null)

    useEffect( () => {
        
        const listener = (event: MouseEvent) => {

            if(editorRef.current && event.target && editorRef.current.contains(event.target as Node)){
                return;
            }

            setEditing(false)
        }
        document.addEventListener('click', listener, { capture: true })

        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }

    },[])

    if(editing){
        return(
            <div className="text-editor" ref={editorRef}>
                <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')} />
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'}/>
            </div>
        </div>
    )
}

export default TextEditor