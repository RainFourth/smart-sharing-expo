import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
//import createSagaMiddleware from 'redux-saga'

import themeReducer, {ThemeStateType} from "./themeReducer";
import reducer, {ReducerStateType} from "@rx/reducer";
import authReducer, {AuthStateType} from "@rx/authReducer";

import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import appReducer, {AppStateType} from "@rx/appReducer";
import apartmentsReducer, {ApartmentsStateType} from "@rx/apartmentsReducer";





const themePersistConfig = {
    key: 'theme',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    // blacklist: ['auth'], // auth will not be persisted
    // whitelist: ['smth'] // ONLY smth will be persisted
}
const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    stateReconciler: hardSet
}

// reducer - функция, принимающая часть state и action, изменяющая state в соответствии с action, и возвращающая его
// Создаём объект, где имя переменной является полем в state, а значение поля - reducer к переменной в store
const rootReducer = combineReducers({
    theme: persistReducer(themePersistConfig, themeReducer),
    reducer: reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    app: appReducer,
    apartments: apartmentsReducer
})

type PersistState = {
    _persist: {
        rehydrated: boolean
        version: number
    }
}
export type StateType = {
    theme: ThemeStateType & PersistState
    reducer: ReducerStateType
    auth: AuthStateType & PersistState
    app: AppStateType
    apartments: ApartmentsStateType
}


// для redux расширения хрома
// @ts-ignore
//const composeEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;




//const sagaMiddleware = createSagaMiddleware()

//const store = createStore(
//    rootReducer,
//    composeEnhancer(applyMiddleware(thunkMiddleware, sagaMiddleware))
//);

/*const store = createStore(
    rootReducer
);*/


// переменные и reducer'ы автоматически создадутся и привяжутся
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);



// для дебага, чтобы в консоли браузера смотреть чё там лежит
//window.store = store;

export default store;







/*let cnt = 0

store.subscribe(()=>{
    console.log("STORE: "+cnt++)
    console.log(store.getState())
})*/