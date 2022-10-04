import { Cell } from "../../state"
import CodeCell from '../code-cell/code-cell'
import TextEditor from '../text-editor/text-editor'
import ActionBar from "../action-bar/action-bar"

import './cell-list-item.css'

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    
    let cellItem: JSX.Element

    if(cell.type === 'code'){
        cellItem = 
        <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} cell={cell}/>
            </div>
            <CodeCell cell={cell}/>
        </>
    } else {
        cellItem = 
        <>
            <ActionBar id={cell.id} cell={cell}/>
            <TextEditor cell={cell}/>
        </>
    }

    return(
        <div className='cell-list-item'>
            {cellItem}
        </div>
    )
}

export default CellListItem