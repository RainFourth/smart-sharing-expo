import { useState, useEffect } from 'react';
import { API_URL } from "@env";


import { fetcher } from '@u';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";


export function useUser(){
    const auth = useSelector<StateType,StateType['auth']>(state => state.auth)

    const authRehydrated = auth._persist.rehydrated
    const [authLoaded, setAuthLoaded] = useState(false)

    const d = useDispatch()

    useEffect(()=>{
        if (!authLoaded && authRehydrated && !auth){

            // TODO
            fetcher.get(`${API_URL}/users/current?represent=session`)
                .then(({ error, status, payload }) => {
                    if (status === 200) {
                        setUser(payload);
                    } else if (status !== 403) {
                        return Promise.reject(error)
                    }
                })
                .catch(error=>{
                    // TODO replace alert
                    alert("Не смог загрузить пользователя"+"\n"+error);
                })
                .finally(()=>setAuthLoaded(true))

        } else if (authRehydrated && auth) setAuthLoaded(true)
    },[auth])

    const setUser = (user: {})=>{ d(setUser(user)) }

    return { user: auth.user, set: setUser, authLoaded: authRehydrated && authLoaded }
}









/*export function useUser() {
    const u = useUserNew()
    return [!u.authLoaded, u.user, u.set];
}*/


/*
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        const userStorage = await AsyncStorage.getItem('user');

        if (userStorage) {
            setUser(JSON.parse(userStorage));
            setLoading(false);
            return;
        }

        // TODO
        const { error, status, payload } = await fetcher.get(`${API_URL}/users/current?represent=session`);

        if (status === 200) {
            await AsyncStorage.setItem('user', JSON.stringify(payload));
            setUser(payload);
        } else if (status !== 403) {
            // TODO replace alert
            alert(error);
        }

        setLoading(false);
    }

    const setUser_ = async (user) => {
        if (user === null) {
            await AsyncStorage.removeItem('user');
        } else {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }

        setUser(user);
    }

    useEffect(() => {
        load();
    }, []);

    return [loading, user, setUser_];
}
*/
