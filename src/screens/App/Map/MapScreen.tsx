import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { sg } from "@u2/utils";
import SearchWidget from "@sc/App/Map/SearchWidget";
import Filters from "@sc/App/Map/Filters";
import Settings from "@sc/App/Map/Settings";
import {useThemeNew} from "@h";


const s = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0, left:0, bottom:0, right:0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    searchBox: {
        position: 'absolute',
        top: 44, left: 15, height: 49, right: 15
    },
    filtersBox: {

    }
});


// todo useNavigation hook
export type MapScreenType = {}


const MapScreen = ({}:MapScreenType) => {

    const { themeObj } = useThemeNew()

    const onMapReady = () => {
        //alert("Map ready!")
    }
    const onMapLoaded = () => {
        //alert("Map loaded!")
    }

    return <View style={s.container}>

        <MapView
            provider={PROVIDER_GOOGLE}
            style={[sg.absolute, { backgroundColor: themeObj.mainColors.bgc2 }]}
            onMapReady={onMapReady}
            onMapLoaded={onMapLoaded}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            showsBuildings={true}
            customMapStyle={themeObj.mapStyle}
        />

        <View style={s.searchBox}>
            <SearchWidget/>
        </View>


        <Filters />

        <Settings />

    </View>
}
export default MapScreen

