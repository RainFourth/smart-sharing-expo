import React, {useEffect, useState} from 'react';
import { Linking } from 'react-native';

import { Messages } from '@sc';
import { ApartmentsMapNavigation, FavoriteApartmentsNavigation, PersonalAccountNavigator, NotificationsNavigation } from '@n';
import { useNavigation } from "@react-navigation/native";
import { Route } from "@sc/App/BottomTabBar";
import MessagesScreen from "@sc/App/MessagesScreen";
import MapScreen from "@sc/App/MapScreen";
import FavoritesScreen from "@sc/App/FavoritesScreen";
import ProfileScreen from "@sc/App/ProfileScreen";





function AppRoot( { navigation }:{ navigation: unknown } ) {



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

    useEffect(() => {
        Linking.addEventListener("url", handleOpenURL);

        return () => Linking.removeEventListener("url", handleOpenURL);
    }, []);


    const [route, setRoute] = useState('map' as Route)


    switch (route){
        case "messages": return <MessagesScreen setRoute={setRoute}/>
        case "map": return <MapScreen navigation={navigation} setRoute={setRoute} />
        case "favorites": return <FavoritesScreen />
        case "profile": return <ProfileScreen />
    }
}

export default AppRoot