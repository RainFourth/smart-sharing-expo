import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import BottomTabBar, {Route} from "@sc/App/BottomTabBar";
import { emptyFun, sg } from "@u2/utils";


const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },

    bottomBarBox: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
        //backgroundColor: 'red'
    },
    blurBgc: {
        height: '100%',
        width: '100%',
        backgroundColor: '#00000000'
        //height: 100,
        //width: 100,
    },
});

// todo useNavigation hook
type MapScreenType = {
    navigation: unknown
    setRoute?: (route: Route) => void
}
const MapScreen = ({navigation, setRoute = emptyFun}:MapScreenType) => {


    /*console.log("AAAAAAAAAAAAAAAAAAAA")
    console.log(navigation)*/



    const onMapReady = () => {
        //alert("Map ready!")
    }
    const onMapLoaded = () => {
        //alert("Map loaded!")
    }

    return <View style={s.container}>

        <MapView
            provider={PROVIDER_GOOGLE}
            style={sg.absolute}
            onMapReady={onMapReady}
            onMapLoaded={onMapLoaded}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            showsBuildings={true}
        />

        <BottomTabBar route={'map'} onRoute={setRoute} />

    </View>
}
export default MapScreen


const ss = StyleSheet.create({
    box: {
        position: 'absolute', top:0, right:0, bottom:0, left:0,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: '11%'
        //backgroundColor: 'red'
    },
    pressable: {
        flex:1, height:'100%',
        display:'flex', justifyContent: 'center', alignItems: 'center',
        //backgroundColor: '#ff000055',
    }
})