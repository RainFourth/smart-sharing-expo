import {Action} from "redux";
import {anyObj} from "@u2/utils";


type appActionType = 'setAppNavTab' | 'setAppNabMapMode' | 'setLocationPermissionGranted'
export type AppActionType = Action<appActionType> & anyObj



export type AppStateType = {
    appNav: {
        bottomBarHeight: number
        tab: 'messages' | 'map' | 'favorites' | 'profile' | undefined
        mapMode: 'none' | 'map' | 'filters' | 'settings' | 'search'
            | 'apartments1' | 'apartments2' | 'apartmentsFull'
    }
}

const initState: AppStateType = {
    appNav: {
        bottomBarHeight: 80,
        tab: 'map',
        mapMode: 'none',
    },

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