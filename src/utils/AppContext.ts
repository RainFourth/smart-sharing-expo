import { createContext } from 'react';
import {ThemeName} from "@h";
import {ReducerActionType, ReducerStateType} from "@rx/reducer";
import {AuthStateType} from "@rx/authReducer";


// todo REMOVE (already using redux)
const AppContext = createContext({ } as {
    user: AuthStateType["user"]
    setUser: (user: AuthStateType["user"])=>void
    theme: ThemeName
    setTheme: (theme: ThemeName)=>void
    dispatch: (action: ReducerActionType)=>void
    state: ReducerStateType
});

export { AppContext };

