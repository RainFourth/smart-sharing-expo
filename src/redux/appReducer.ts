import {Action} from "redux";
import {anyObj} from "@u2/utils";


type appActionType = 'setAppNavTab' | 'setAppNabMapMode' | 'setLocationPermissionGranted'
export type AppActionType = Action<appActionType> & anyObj

// todo save location permission status

export type AppStateType = {
    appNav: {
        readonly bottomBarHeight: number
        tab: 'messages' | 'map' | 'favorites' | 'profile' | undefined
        mapMode: 'none' | 'map' | 'filters' | 'settings' | 'search' | 'availableApartments'
    }
    location: {
        granted: boolean
    }
}

const initState: AppStateType = {
    appNav: {
        bottomBarHeight: 80,
        tab: 'map',
        mapMode: 'none',
    },
    location: {
        granted: false
    }

}




const appReducer = (state = initState, action: AppActionType) => {
    switch (action.type){
        case "setAppNavTab": return {
            ...state,
            appNav: {...state.appNav, tab: action.tab}
        }
        case "setAppNabMapMode": return {
            ...state,
            appNav: {...state.appNav, mapMode: action.mapMode}
        }
        case "setLocationPermissionGranted": return {
            ...state,
            location: {
                ...state.location,
                granted: action.granted
            }
        }
        default: return state
    }
}
export default appReducer



export const setAppNavTab = (tab: AppStateType['appNav']['tab']): AppActionType => ({
    type: 'setAppNavTab', tab
})
export const setAppNavMapMode = (mapMode: AppStateType['appNav']['mapMode']): AppActionType => ({
    type: 'setAppNabMapMode', mapMode
})
export const setLocationPermissionGranted = (granted: AppStateType['location']['granted']): AppActionType => ({
    type: 'setLocationPermissionGranted', granted
})