import {anyObj} from "@u2/utils";

// todo use redux or thunk

type ActionType = {type: string}&anyObj

// todo types
type StateType = {
    favorites: unknown[],
    notifications: unknown[]
}

const initState: StateType = {
    favorites: [],
    notifications: []
}

function reducer(state: StateType, action: ActionType) {
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

export {
    ActionType,
    StateType,
    initState,
    reducer
}