import React, { useEffect } from 'react';
import {Linking, View} from 'react-native';

import { Messages } from '@sc';
import { ApartmentsMapNavigation, FavoriteApartmentsNavigation, PersonalAccountNavigator, NotificationsNavigation } from '@n';
import MessagesScreen from "@sc/App/Messages/MessagesScreen";
import MapScreen from "@sc/App/Map/MapScreen";
import FavoritesScreen from "@sc/App/Favorites/FavoritesScreen";
import ProfileScreen from "@sc/App/Profile/ProfileScreen";
import { StackScreenProps } from "@react-navigation/stack";


import BottomTabBar from "@sc/App/BottomTabBar";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import { setAppNavTab } from "@rx/appReducer";
import {MainStackType} from "@sc/Main";
import {useThemeNew} from "@h";




const bottomBarH = 80


export type AppNavProps = {}

type Type = StackScreenProps<MainStackType,'AppNav'>

function AppNav({}:Type ) {

    const d = useDispatch()
    const appNav = useSelector((s:StateType)=>s.app.appNav)
    const { themeObj } = useThemeNew()

    // todo
    function handleOpenURL({ url }:{ url:string }) {
        if (!/^.*:\/\/oauth/.test(url)) return;

        // @ts-ignore
        const params = url
            .match(/\?(.*)/)[1]
            .split("&")
            .reduce((res, el) => {
                const [key, value] = el.split("=");

                // @ts-ignore
                res[key] = decodeURIComponent(value);

                return res;
            }, {})

        // TODO change redirect screen
        // @ts-ignore
        navigation.navigate("OAuthStatusScreen", params);
    }

    // todo
    useEffect(() => {
        Linking.addEventListener("url", handleOpenURL);

        return () => Linking.removeEventListener("url", handleOpenURL);
    }, []);






    return <View style={{flex:1, backgroundColor: themeObj.mainColors.bgc2}}>
        {function (){switch (appNav.tab){
            case "messages": return <MessagesScreen />
            case "map": return <MapScreen />
            case "favorites": return <FavoritesScreen />
            case "profile": return <ProfileScreen />
            default: return <></>
        }}()}

        {/*{
            !['filters','settings'].includes(appNav.mapMode) && <BottomTabBar
                tab={appNav.tab} height={bottomBarH}
                onTab={(tab)=>d(setAppNavTab(tab))}
                zIndex={-0}
            />
        }*/}
        <BottomTabBar
            tab={appNav.tab} height={bottomBarH}
            onTab={(tab)=>d(setAppNavTab(tab))}
            zIndex={['filters','settings'].includes(appNav.mapMode)?-1:0}
        />
    </View>


    // todo old:
    return <Messages.MainScreen/> // теперь MessagesScreen
    return <NotificationsNavigation />// не отображается
    return <ApartmentsMapNavigation /> // теперь MapScreen
    return <FavoriteApartmentsNavigation /> // теперь FavoritesScreen
    return <PersonalAccountNavigator /> // теперь ProfileScreen
}

export default AppNav