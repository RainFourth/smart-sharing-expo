import {Action} from "redux";
import {anyObj} from "@u2/utils";


type authReducerTypes = "set-user"
export type AuthActionType = Action<authReducerTypes> & anyObj



export type AuthStateType = {
    user: { } & anyObj | null // todo type
}
// Initial State
const initState: AuthStateType = {
    user: null
}



// Reducer
const authReducer = (state = initState, action: AuthActionType) => {
    let newState
    switch (action.type){
        case 'set-user':
            newState = {
                ...state,
                user: action.user
            }
            return newState
        default: return state
    }
}
export default authReducer



// todo types
// ActionCreators
export const setUser = (user: { }): AuthActionType => ({
    type: 'set-user', user
})


