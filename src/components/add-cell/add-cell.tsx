import { useActions } from '../../hooks/use-actions';

import './add-cell.css';

interface AddCellProps {
    previousCellId: string | null
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {

    const { insertCellAfter } = useActions();

    //@todo on hover last add cell should be full height hover

    return(
        <div className={`add-cell ${forceVisible && 'add-cell-visible'}`}>
            <div className="add-cell-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'code')}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>
                        Code
                    </span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'text')}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>
                        Text
                    </span>
                </button>
            </div>
            <div className="add-cell-divider"></div>
        </div>
    )
}

export default AddCell