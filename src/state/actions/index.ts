import { ActionType } from "../action-types";
import { CellTypes, Cell } from "../cell"

export type DirectionTypes = 'up' | 'down'


export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: DirectionTypes
    }
}

export interface SaveCellAction {
    type: ActionType.SAVE_CELL;
    payload: {
        id: string;
        cell: Cell
    }
}

export interface CreateSavedCellAction {
    type: ActionType.CREATE_SAVED_CELL;
    payload: {
        id: string;
        cell: Cell
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string

}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellTypes
    }
}

export interface UpdateCellAction {    
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }
}

export interface BundleStartAction {
    type: ActionType.BUNDLE_START,
    payload: {
        cellId: string;
    }
}

export interface BundleCompletAction {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
        cellId: string;
        bundle: {
            code: string,
            err: string
        }
    }
}

export type Action = 
    MoveCellAction 
    | DeleteCellAction 
    | InsertCellAfterAction 
    | UpdateCellAction
    | BundleCompletAction
    | BundleStartAction
    | SaveCellAction
    | CreateSavedCellAction;

