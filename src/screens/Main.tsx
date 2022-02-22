import 'react-native-gesture-handler';
/*
    About import 'react-native-gesture-handler';

    To finalize installation of react-native-gesture-handler, add the following at the top
    (make sure it's at the top and there's nothing else before it)
    of your entry file, such as index.js or App.js
 */


import React, { useMemo, useReducer, useEffect, useCallback, useState } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { useNetInfo } from "@react-native-community/netinfo";

import { useFonts } from 'expo-font';

import { WelcomeScreen, Auth, OAuth, PreloaderScreen } from '@sc';
import { AppNavigation, LoginNavigation } from '@n';
import { AppContext, prettyPrint } from '@u';
import { useAuth, useSocket, useThemeNew } from '@h';
import { Notification } from '@c';

import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import MapScreen from "@sc/App/MapScreen";
import { MapScreen as MapScreenOld } from "@sc/Apartments/MapScreen";
import AppRoot from "@sc/App/AppRoot";


const RootNavigation = createStackNavigator();





// BackgroundTask.define(() => {
// 	console.log('Hello from a background task')
// 	BackgroundTask.finish()
// })




function Main() {

    const t = useThemeNew()

    const { isConnected } = useNetInfo(); // инфа о доступности интернета

    const auth = useAuth()

    const state = useSelector<StateType,StateType['reducer']>(state=>state.reducer)
    const d = useDispatch()

    // todo check if bold, italics font kinds are importing - походу не импортятся
    const [fontLoaded] = useFonts({
        'Montserrat-Regular': require('@assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('@assets/fonts/Montserrat-Medium.ttf'),
    })

    const preloading = useMemo(() => !isConnected || !auth.authDataReady || !t.themeLoaded || !fontLoaded,
        [isConnected, auth.authDataReady, t.themeLoaded, fontLoaded]);



    const [notification, notificationVisible, setNotificationVisible] = useSocket()



    if (!t.themeLoaded) return <></>

    //return <PreloaderScreen />

    return (
        <AppContext.Provider
            value={{
                user: auth.user, setUser: auth.setUser,
                theme: t.theme, setTheme: t.setTheme,
                dispatch: d, state
            }}
        >
            {preloading && <PreloaderScreen />}
            {!preloading &&
                <>
                    <NavigationContainer
                        // initialState={initialState}
                        // onStateChange={(state) =>
                        // 	AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                        // }
                    >
                        {/**/}
                        <RootNavigation.Navigator
                            screenOptions={{
                                headerShown: false,
                                //headerTitle: 'Smart Sharing'
                            }}
                            initialRouteName='AppRoot'
                        >
                            <RootNavigation.Screen name='WelcomeScreen' component={WelcomeScreen} />
                            <RootNavigation.Screen name='AppNavigation' component={AppNavigation} />
                            <RootNavigation.Screen name='Login' component={LoginNavigation} />
                            <RootNavigation.Screen name='SignUpScreen' component={Auth.SignUpScreen} />
                            <RootNavigation.Screen name='SignInScreen' component={Auth.SignInScreen} />
                            <RootNavigation.Screen name="OAuthStatusScreen" component={OAuth.StatusScreen} />
                            <RootNavigation.Screen name='OAuthSignInScreen' component={OAuth.SignInScreen} />
                            <RootNavigation.Screen name='OAuthSignUpScreen' component={OAuth.SignUpScreen} />

                            <RootNavigation.Screen name='AppRoot' component={AppRoot} />
                            <RootNavigation.Screen name='MapScreenNew' component={MapScreen} />
                            <RootNavigation.Screen name='MapScreenOld' component={MapScreenOld} />
                        </RootNavigation.Navigator>
                    </NavigationContainer>

                    <Notification visible={notificationVisible} setVisible={setNotificationVisible}
                                  notification={notification}
                                  onPress={() => {
                                      //prettyPrint(navigationRef)
                                      // 	navigation.navigate('AppNavigation', {
                                      // 	screen: 'Notifications'
                                      // })
                                  }}
                    />
                </>
            }

        </AppContext.Provider>
    )
}

export default Main;




// const [initialState, setInitialState] = useState();
// const [isReady, setIsReady] = useState(false);

// useEffect(() => {
// 	const restoreState = async () => {
// 		try {
// 			const initialUrl = await Linking.getInitialURL();

// 			if (Platform.OS !== 'web' && initialUrl == null) {
// 				// Only restore state if there's no deep link and we're not on web
// 				const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
// 				const state = savedStateString ? JSON.parse(savedStateString) : undefined;

// 				if (state !== undefined) {
// 					setInitialState(state);
// 				}
// 			}
// 		} finally {
// 			setIsReady(true);
// 		}
// 	};

// 	if (!isReady) {
// 		restoreState();
// 	}
// }, [isReady]);

// if (!isReady) {
// 	return null;
// }

// useEffect(() => {
// 	BackgroundTask.schedule({
// 		period: 10
// 	})








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
