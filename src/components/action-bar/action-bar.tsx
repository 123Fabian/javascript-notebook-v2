import { useActions } from '../../hooks/use-actions'
import { Cell } from "../../state"

import './action-bar.css'

interface ActionBarProps {
    id: string
    cell: Cell
}

const ActionBar: React.FC<ActionBarProps> = ({ id, cell }) => {
        
    const { moveCell, deleteCell, saveCell } = useActions();

    return(
        <div className="action-bar">
            <button className="button is-primary is-small" onClick={ () => moveCell(id, 'up')}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={ () => moveCell(id, 'down')}>
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={ () => deleteCell(id)}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={ () => saveCell(id, cell)}>
                <span className="icon">
                    <i className="fas fa-save"></i>
                </span>
            </button>
        </div>
    )
}

export default ActionBar