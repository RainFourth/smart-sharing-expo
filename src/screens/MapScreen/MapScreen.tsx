import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native'
import { useDimens } from "@h/useDimens";
import { WebView } from 'react-native-webview';
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import BottomTabBar from "@sc/MapScreen/BottomTabBar";


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
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    transparent: {
        backgroundColor: '#00000000'
    }
});


const MapScreen = ({navigation}:{navigation: any}) => {


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
            style={s.absolute}
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

        <View style={s.bottomBarBox}>

            <WebView
                style={[s.absolute, s.transparent]}
                originWhitelist={['*']}
                source={{ html:
                        '<div style="' +
                        'position: absolute; top: 0; right:0; bottom: 0; left: 0;' +
                        'background: rgba(255,255,255,0.2); backdrop-filter: blur(48px);' +
                        '/*width:100%; height:100%; margin:0; padding:-10px;*/' +
                        '/*background: #ff000033;*/ /*transparent*/ /*background: #4fc3f733;*/  /*border: none*/" ' +
                        '></div>'
                }}
            />

            <BottomTabBar selected={'location'}/>

        </View>

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