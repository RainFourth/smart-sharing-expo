import { createContext } from 'react';
import {ThemeName} from "@h";
import {ReducerActionType, ReducerStateType} from "@rx/reducer";
import {UserStateT} from "@rx/userReducer";


// todo REMOVE (already using redux)
const AppContext = createContext({ } as {
    user: UserStateT["user"]
    setUser: (user: UserStateT["user"])=>void
    theme: ThemeName
    setTheme: (theme: ThemeName)=>void
    dispatch: (action: ReducerActionType)=>void
    state: ReducerStateType
});

export { AppContext };

