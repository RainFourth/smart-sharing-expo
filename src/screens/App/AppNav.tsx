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
import ExampleDraggableBallAnim from "~/EXAMPLES/ExampleDraggableBallAnim";
import TestScreen from "~/EXAMPLES/TestScreen";
import {sg} from "@u2/styleGlobal";
import Filters from "@sc/App/Apartments/Map/Filters";
import Settings from "@sc/App/Apartments/Map/Settings";
import ExampleBottomSheet from "~/EXAMPLES/ExampleBottomSheet";
import AvailableApartments from "@sc/App/Apartments/Map/AvailableApartments";






export type AppNavProps = {}

type Type = StackScreenProps<MainStackType,'AppNav'>

function AppNav({}:Type ) {

    const { themeObj } = useThemeNew()
    const { tab } = useSelector((s:StateType)=>s.app.appNav)

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

        {function (){switch (tab){
            case "messages": return <ApartmentsMapNavigation />//return <MessagesScreen />
            case "map": return <ApartmentsNav/>//return <MapScreen />
            case "favorites": return <ExampleBottomSheet/>//return <FavoritesScreen />
            case "profile": return <ExampleDraggableBallAnim/>//return <ProfileScreen />
            default: return <></>
        }}()}

        <BottomTabBar />

        { tab==='map' && <Filters/> }

        { tab==='map' && <Settings/> }

    </View>


    // todo old:
    return <Messages.MainScreen/> // теперь MessagesScreen
    return <NotificationsNavigation />// не отображается
    return <ApartmentsMapNavigation /> // теперь MapScreen
    return <FavoriteApartmentsNavigation /> // теперь FavoritesScreen
    return <PersonalAccountNavigator /> // теперь ProfileScreen
}

export default AppNav