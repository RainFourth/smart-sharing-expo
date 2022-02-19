import { createContext } from 'react';
import {ThemeName} from "@h";
import {ActionType, StateType} from "@u/reducer";



const AppContext = createContext({ } as {
    user: unknown // todo type
    setUser: unknown // todo type
    theme: ThemeName
    setTheme: (theme: ThemeName)=>void
    dispatch: (action: ActionType)=>void // todo use redux or thunk
    state: StateType // todo use redux or thunk
});

export { AppContext };

