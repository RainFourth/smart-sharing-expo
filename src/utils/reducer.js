const initState = {
    favorites: [],
    notifications: []
}

function reducer(state, action) {
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
    initState,
    reducer
}