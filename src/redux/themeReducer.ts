import {ThemeName} from "@h";
import {Action} from "redux";
import {anyObj} from "@u2/utils";


type themeActionTypes = "set-theme"
export type ThemeActionType = Action<themeActionTypes> & anyObj



export type ThemeStateType = {
    theme: ThemeName
}
// Initial State
const initState: ThemeStateType = {
    theme: 'light'
}



// Reducer
const themeReducer = (state = initState, action: ThemeActionType) => {
    let newState
    switch (action.type){
        case 'set-theme':
            newState = {
                ...state,
                theme: action.theme
            }
            return newState
        default: return state
    }
}
export default themeReducer




// ActionCreators
export const setTheme = (theme: ThemeName): ThemeActionType => ({
    type: 'set-theme', theme
})
