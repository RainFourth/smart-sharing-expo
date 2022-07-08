import {Action} from "redux";
import {anyObj, empty} from "@u2/utils";
import {RightsType} from "@u";
import {FavoriteList} from "@se/apartmentsService2";
import { User, userService } from "@se/userService2";


type UserReducerT = 'setUser' | 'setJwt'
export type UserActionT = Action<UserReducerT> & anyObj


// user type: 'local' | ...

// todo type
export type UserStateT = {
    jwt: string|null|undefined
    user: User|null|undefined
}
// Initial State
const initState: UserStateT = {
    jwt: undefined,
    user: undefined,
}



// Reducer
const userReducer = (state = initState, action: UserActionT) => {
    let newState
    switch (action.type){
        case 'setUser':
            newState = {
                ...state,
                user: action.user
            }
            return newState
        case 'setJwt':
            newState = {
                ...state,
                jwt: action.jwt
            }
            return newState
        default: return state
    }
}
export default userReducer




// ActionCreators
export const setUser = (user: UserStateT["user"]): UserActionT => ({
    type: 'setUser', user
})
export const setJwt = (jwt: UserStateT['jwt']): UserActionT => ({
    type: 'setJwt', jwt
})


// ThunkCreators
/*export const setJwtAndUser = (jwt: AuthStateType['jwt'], user: AuthStateType["user"]): AuthActionType => ({
    type: 'setJwt', jwt
})*/
const loadUser = () => async (d) => {
    const { data, error } = await userService.getCurrentUser()
    d(setUser(data))
}


export {
    loadUser
}