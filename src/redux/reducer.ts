import {Action} from "redux";
import {anyObj} from "@u2/utils";



export type reducerActionTypes =
    'addFavorites'|'addNotification'|'update'|
    'deleteFavorite'|'deleteNotification'|'refresh'
export type ReducerActionType = Action<reducerActionTypes> & {payload: unknown[]} & anyObj



// todo types
export type ReducerStateType = {
    favorites: unknown[],
    notifications: unknown[]
}
export const initState: ReducerStateType = {
    favorites: [],
    notifications: []
}


export function reducer(state = initState, action: ReducerActionType) {
    switch (action.type) {
        case 'addFavorites':
            return {
                ...state,
                favorites: [...state.favorites, ...action.payload]
            };
        case 'addNotification':
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            }
        case 'update':
            return {
                ...state,
                ...action.payload
            }
        case 'deleteFavorite':
            return {
                ...state,
                favorites: action.payload
            };
        case 'deleteNotification':
            return {
                ...state,
                notifications: action.payload
            }
        case 'refresh':
            return initState;
        default:
            return state
    }
}
export default reducer



// todo types
// ActionCreators
export const addFavorites = (favorites: unknown[]): ReducerActionType => ({
    type: 'addFavorites', payload: favorites
})
export const addNotifications = (notifications: unknown[]): ReducerActionType => ({
    type: 'addNotification', payload: notifications
})
export const update = (update: unknown[]): ReducerActionType => ({
    type: 'update', payload: update
})
export const deleteFavorite = (deleteFavorite: unknown[]): ReducerActionType => ({
    type: 'deleteFavorite', payload: deleteFavorite
})
export const deleteNotification = (deleteNotification: unknown[]): ReducerActionType => ({
    type: 'deleteNotification', payload: deleteNotification
})
export const refresh = (refresh: unknown[]): ReducerActionType => ({
    type: 'refresh', payload: refresh
})






