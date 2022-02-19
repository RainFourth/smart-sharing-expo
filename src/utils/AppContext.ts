import { createContext } from 'react';
import {ThemeName} from "@h";
import {ReducerActionType, ReducerStateType} from "@rx/reducer";


// todo REMOVE (already using redux)
const AppContext = createContext({ } as {
    user: unknown // todo type
    setUser: unknown // todo type
    theme: ThemeName
    setTheme: (theme: ThemeName)=>void
    dispatch: (action: ReducerActionType)=>void
    state: ReducerStateType
});

export { AppContext };

