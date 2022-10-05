import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import localForage from 'localforage';

import reducers from "./reducers";
import { randomId } from "./reducers/cellsReducer";
import { ActionType } from "./action-types";
import { Cell } from "./cell";

export const store = createStore( reducers, {}, applyMiddleware(thunk))

const cellCache = localForage.createInstance({
    name: 'cellCache',
});

const savedList = async () => {
    const length = await cellCache.length()
    if(length > 0){
        await cellCache.iterate( (cell: Cell) => {
            store.dispatch({
                type: ActionType.CREATE_SAVED_CELL,
                payload: {
                    id: cell.id,
                    cell: cell
                }
            })
        })
    }
    return length;
}

const defaultList = () => {

    const codeCell: Cell = {
        id: randomId(),
        content: "import ReactDOM from 'react-dom'\r\nimport 'bulmaswatch/superhero/bulmaswatch.min.css';\r\n\r\nconst App = () => {\r\n    return(\r\n        <div>\r\n            <h1 class=\"red\">Welkom op Javascript Sketchbook</h1>\r\n        </div>\r\n    )\r\n}\r\n\r\nReactDOM.render(<App/>, document.querySelector('#root'))",
        type: 'code'
    }

    const textCell: Cell = {
        id: randomId(),
        content: "Welkom op *Javascript *\n\n> **Sketchbook**",
        type: 'text'
    }

    store.dispatch({
        type: ActionType.CREATE_SAVED_CELL,
        payload: {
            id: codeCell.id,
            cell: codeCell
        }
    })


    store.dispatch({
        type: ActionType.CREATE_SAVED_CELL,
        payload: {
            id: textCell.id,
            cell: textCell
        }
    })
}

savedList()
    .then(result => {
        if(result === 0 ){
            defaultList();
        }
    })
    .catch(() => {
        defaultList();
    });
    

