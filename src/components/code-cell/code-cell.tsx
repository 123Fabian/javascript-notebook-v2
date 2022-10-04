import { useEffect } from "react";
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from "../resizable/resizable";
import { Cell } from "../../state";
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { useCumulativeCode } from "../../hooks/use-cumulative-code";

import './code-cell.css'

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useActions();
    
    const bundle = useTypedSelector((state: { bundles: { [x: string]: any; }; }) => state.bundles[cell.id])
    const cumulativeCode = useCumulativeCode(cell.id)

    useEffect( () => {
        if(!bundle){
            createBundle(cell.id, cumulativeCode)
            return;
        }

        const timer = setTimeout( async () => {
            createBundle(cell.id, cumulativeCode)
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line
    }, [cell.id, cell.content, createBundle, cumulativeCode])
   
    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialValue={cell.content}
                        onChange={(value: any) => updateCell(cell.id, value)}    
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {
                        !bundle || bundle.loading ? (
                                <div className="progress-cover">
                                    <progress className="progress is-small is-primary" max="100">
                                        Loading
                                    </progress>
                                </div>
                        ) : (
                            <Preview code={bundle.code} error={bundle.err}/>
                        )
                    }
                </div>
            </div>
        </Resizable>
    )
}

export default CodeCell
