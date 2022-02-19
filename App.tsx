import React from "react";


import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "~/redux/store";
// and you can't useDispatch here because in props of this component no store yet

import Main from "@c/Main";


const persistor = persistStore(store)


function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Main/>
            </PersistGate>
        </Provider>
    )
}

export default App;










// было в шаблоне:

//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';

/*export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});*/
