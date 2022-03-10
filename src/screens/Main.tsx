import 'react-native-gesture-handler';
/*
    About import 'react-native-gesture-handler';

    To finalize installation of react-native-gesture-handler, add the following at the top
    (make sure it's at the top and there's nothing else before it)
    of your entry file, such as index.js or App.js
 */


import React, { useMemo } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { useNetInfo } from "@react-native-community/netinfo";

import { useFonts } from 'expo-font';

import { WelcomeScreen, Auth, OAuth, PreloaderScreen } from '@sc';
import { LoginNavigation } from '@n';
import { AppContext, prettyPrint } from '@u';
import { useAuth, useSocket, useThemeNew } from '@h';
import { Notification } from '@c';

import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@rx/store";
import AppNav, {AppNavProps} from "@sc/App/AppNav";






// BackgroundTask.define(() => {
// 	console.log('Hello from a background task')
// 	BackgroundTask.finish()
// })



import { useNavigation } from "@react-navigation/native";
import {Keyboard, PixelRatio, Pressable, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Example from "@sc/Example";
import {backgroundColor} from "react-native-calendars/src/style";
import {sg} from "@u2/styleGlobal";
import TestScreen from "@sc/TestScreen"; // todo изучить
// https://reactnavigation.org/docs/navigation-prop
// https://reactnavigation.org/docs/typescript/#combining-navigation-props
export type MainStackType = {
    AppNav: AppNavProps
    [name: string]: {} // todo types of other components
}
const RootNav = createStackNavigator<MainStackType>();



/*
    todo
     1) уведомления внутри приложения
     2) Нажмите назад ещё раз чтобы выйти

 */



function Main() {

    const t = useThemeNew()

    const { isConnected } = useNetInfo(); // инфа о доступности интернета

    const auth = useAuth()

    const state = useSelector((s:StateType)=>s.reducer)
    const d = useDispatch()


    const [fontLoaded] = useFonts({
        'Montserrat-Thin': require('@assets/fonts/Montserrat-Thin.ttf'),
        'Montserrat-ExtraLight': require('@assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-Light': require('@assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Regular': require('@assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('@assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('@assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('@assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Black': require('@assets/fonts/Montserrat-Black.ttf'),
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
            {/*<TouchableOpacity
                style={[sg.absolute, {backgroundColor: 'transparent', opacity: 0, zIndex: -1000}]}
                onPress={onPressTO}
            >*/}
                <View style={[sg.absolute, {backgroundColor: t.themeObj.mainColors.bgc1}]} >
                    <StatusBar
                        style={t.theme === 'light' ? 'dark' : 'light'}
                    />
                    {preloading && <PreloaderScreen/>}
                    {!preloading &&
                        <>
                            <NavigationContainer
                                // initialState={initialState}
                                // onStateChange={(state) =>
                                // 	AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                                // }
                            >
                                {/**/}
                                <RootNav.Navigator
                                    screenOptions={{
                                        headerShown: false,
                                        //headerTitle: 'Smart Sharing'
                                    }}
                                    initialRouteName='AppNav'
                                >
                                    <RootNav.Screen name='Example' component={Example} />
                                    <RootNav.Screen name='TestScreen' component={TestScreen} />


                                    <RootNav.Screen name='AppNav' component={AppNav}/>

                                    <RootNav.Screen name='WelcomeScreen' component={WelcomeScreen}/>

                                    <RootNav.Screen name='Login' component={LoginNavigation}/>
                                    <RootNav.Screen name='SignUpScreen' component={Auth.SignUpScreen}/>
                                    <RootNav.Screen name='SignInScreen' component={Auth.SignInScreen}/>
                                    <RootNav.Screen name="OAuthStatusScreen" component={OAuth.StatusScreen}/>
                                    <RootNav.Screen name='OAuthSignInScreen' component={OAuth.SignInScreen}/>
                                    <RootNav.Screen name='OAuthSignUpScreen' component={OAuth.SignUpScreen}/>

                                </RootNav.Navigator>
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
                </View>
            {/*</TouchableOpacity>*/}


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
