import { Fragment, useEffect } from "react"
import localForage from "localforage"

import { useTypedSelector } from "../../hooks/use-typed-selector"
import CellListItem from "../cell-list-item/cell-list-item"
import AddCell from "../add-cell/add-cell"
import { Cell } from "../../state"

import './cell-list.css'

const CellList: React.FC = () => {

    // const cellCache = localForage.createInstance({
    //     name: 'cellCache',
    // });

    // useEffect( () => {
    //     console.log('x');
    //     let renderedCells = cellCache.iterate((cell: Cell) => {        
    //         <Fragment key={cell.id}>
    //             <CellListItem cell={cell}/>
    //             <AddCell previousCellId={cell.id}/>
    //         </Fragment>
    //     })
    //     console.log(renderedCells);
    // }, []);

    const cellList = useTypedSelector( ({ cells: { order, data }}) => {
        return order.map(orderId => {
            return data[orderId]
        })
    })

    const renderedCells = cellList.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell}/>
            <AddCell previousCellId={cell.id}/>
        </Fragment>
    ))

    return(
        <div className="cell-list">
            <AddCell forceVisible={cellList.length === 0} previousCellId={null}/>
            {renderedCells}
        </div>
    )
}

export default CellList