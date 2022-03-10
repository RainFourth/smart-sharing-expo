import React, { useEffect } from 'react';
import {Linking, View} from 'react-native';

import { Messages } from '@sc';
import { ApartmentsMapNavigation, FavoriteApartmentsNavigation, PersonalAccountNavigator, NotificationsNavigation } from '@n';
import MessagesScreen from "@sc/App/Messages/MessagesScreen";
import MapScreen from "@sc/App/Apartments/Map/MapScreen";
import FavoritesScreen from "@sc/App/Favorites/FavoritesScreen";
import ProfileScreen from "@sc/App/Profile/ProfileScreen";
import { StackScreenProps } from "@react-navigation/stack";


import BottomTabBar from "@sc/App/BottomTabBar";
import {useSelector} from "react-redux";
import {StateType} from "@rx/store";
import {MainStackType} from "@sc/Main";
import {useThemeNew} from "@h";
import ApartmentsNav from "@sc/App/Apartments/ApartmentsNav";
import Example from "@sc/Example";
import TestScreen from "@sc/TestScreen";
import {sg} from "@u2/styleGlobal";
import Filters from "@sc/App/Apartments/Map/Filters";
import Settings from "@sc/App/Apartments/Map/Settings";






export type AppNavProps = {}

type Type = StackScreenProps<MainStackType,'AppNav'>

function AppNav({}:Type ) {

    const { themeObj } = useThemeNew()
    const { tab, mapMode } = useSelector((s:StateType)=>s.app.appNav)

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






    return <View style={[sg.absolute, {backgroundColor: themeObj.mainColors.bgc2}]}>

        {/*<TestScreen/>*/}

        {function (){switch (tab){
            case "messages": return <ApartmentsMapNavigation />//return <MessagesScreen />
            case "map": return <ApartmentsNav/>//return <MapScreen />
            case "favorites": return <FavoritesScreen />
            case "profile": return <Example/>//return <ProfileScreen />
            default: return <></>
        }}()}

        <BottomTabBar />

        { tab==='map' && <View style={sg.absolute} pointerEvents='box-none'>
            <Filters/>
        </View> }

        { tab==='map' && <View style={sg.absolute} pointerEvents='box-none'>
            <Settings/>
        </View> }

    </View>


    // todo old:
    return <Messages.MainScreen/> // теперь MessagesScreen
    return <NotificationsNavigation />// не отображается
    return <ApartmentsMapNavigation /> // теперь MapScreen
    return <FavoriteApartmentsNavigation /> // теперь FavoritesScreen
    return <PersonalAccountNavigator /> // теперь ProfileScreen
}

export default AppNav