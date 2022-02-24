import {Action} from "redux";
import {anyObj, empty} from "@u2/utils";
import {RightsType} from "@u";


type authReducerTypes = "set-user" | 'set-jwt'
export type AuthActionType = Action<authReducerTypes> & anyObj


// user type: 'local' | ...

// todo type
export type AuthStateType = {
    jwt: string|empty
    user: {
        is_verified: boolean
        name: string
        patronymic: string // отчество
        surname: string
        birth_date: number // timestamp
        registration_city: {
            name: string
        }
        work_city: {
            name: string
            lat: number // latitude
            lon: number // longitude
            id: string|number
        }
        email: string
        is_email_confirmed: boolean
        phone: string|number
        role: {
            role: string
        }
        documents: {path: string}[]
        rights: RightsType[]
    } | empty
}
// Initial State
const initState: AuthStateType = {
    jwt: null,
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
        case 'set-jwt':
            newState = {
                ...state,
                jwt: action.jwt
            }
            return newState
        default: return state
    }
}
export default authReducer




// ActionCreators
export const setUser = (user: AuthStateType["user"]): AuthActionType => ({
    type: 'set-user', user
})
export const setJwt = (jwt: AuthStateType['jwt']): AuthActionType => ({
    type: 'set-jwt', jwt
})


// ThunkCreators
/*export const setJwtAndUser = (jwt: AuthStateType['jwt'], user: AuthStateType["user"]): AuthActionType => ({
    type: 'set-jwt', jwt
})*/


