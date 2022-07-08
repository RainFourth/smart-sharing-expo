import {useDispatch, useSelector} from "react-redux";
import {StateT} from "@rx/store";
import {UserStateT, setUser as setUserActionCreator, setJwt as setJwtActionCreator, setJwt} from "@rx/userReducer";
import {useEffect, useState} from "react";
import * as userService from "@se/userService";

/*

const defaultUser: AuthStateType['user'] = {
    is_verified: false,
    name: "User",
    patronymic: "Default", // отчество
    surname: "Test",
    birth_date: 946684800000, // timestamp 01.01.2000 00:00:00 GMT+0
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
}

*/

export function useAuth(){
    const { user, jwt, _persist : { rehydrated: authRehydrated } } =
        useSelector((s:StateT)=>s.user)
    const [authLoaded, setAuthLoaded] = useState(false)
    const d = useDispatch()
    const [authDataReady, setAuthDataReady] = useState(false)


    useEffect(()=>{
        if (authRehydrated && (!jwt || !user)){
            updateUserAndJwt().finally(()=>setAuthLoaded(true))
        }
    },[authRehydrated])

    useEffect(()=>{
        if (authRehydrated && authLoaded) setAuthDataReady(true)
    },[authRehydrated, authLoaded])


    // via getCurrentJwt (by session) => jwt
    const updateJwt = async () => {
        const { error, jwt } = await userService.getCurrentJwt();
        if (error) return
        //setJwt(jwt)
    }

    // via getAuthDataBySession => jwt & user
    const updateUserAndJwt = async () => {
        const { error, jwt, user } = await userService.getAuthDataBySession()
        if (error) return
        else {
            //setJwt(jwt)
            //setUser(user)
        }
    }

    const setUser = (user: UserStateT['user']) => {
        d(setUserActionCreator(user))
    }
    const setJwt = (jwt: UserStateT['jwt']) => {
        d(setJwtActionCreator(jwt))
    }

    return { user, jwt, setUser, setJwt, updateJwt, authDataReady }
}





// todo если юзера обновили извне приложения, то должен быть ивент о том, то надо загрузить новые данные

// todo user from strage - now; user from remote server - async (наверное)

// todo получение jwt и получение user
// todo при старте приложения узнать, есть ди новые данные о юзере и загрузить их или просто потребовать нового юзера

