import React, {useEffect, useRef, useState} from 'react'
import MapView, {LatLng, PROVIDER_GOOGLE, Region} from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import {empty} from "@u2/utils";
import MapSearchWidget from "@sc/App/Apartments/Map/MapSearchWidget";
import Filters from "@sc/App/Apartments/Map/Filters";
import Settings from "@sc/App/Apartments/Map/Settings";
import {useThemeNew} from "@h";
import {useBackHandler} from "@react-native-community/hooks";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import {setAppNavMapMode, setLocationPermissionGranted} from "@rx/appReducer";
import * as Location from 'expo-location'
import {Accuracy} from "expo-location";
import {sg} from "@u2/styleGlobal";


const s = StyleSheet.create({
    searchBox: {
        position: 'absolute',
        top: 44, left: 15, height: 49, right: 15
    }
});


// todo useNavigation hook
export type MapScreenType = {}


const MapScreen = ({}:MapScreenType) => {

    const { themeObj } = useThemeNew()
    const { appNav: { mapMode }, location: { granted: locationGranted }} = useSelector((s: StateType) => s.app)
    const d = useDispatch()

    useBackHandler(()=>{
        if (mapMode !== 'map') {
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })

    const mapRef = useRef<MapView>(null)

    const [location, setLocation] = useState(undefined as empty|Location.LocationObject)

    const onMapReady = () => {
        //alert("Map ready!")
    }
    const onMapLoaded = () => {
        //alert("Map loaded!")
    }


    useEffect(()=>{
        //setLoadLocationPermission(true)
        //setErrLocationPermission(undefined)
        Location.requestForegroundPermissionsAsync()
            .then(({status})=>{
                if (status==='granted'){
                    d(setLocationPermissionGranted(true))
                } else {
                    throw new Error()
                }
            })
            .catch(err=>{
                //setLocationPermission(false)
                //setErrLocationPermission("Ошибка получения разрешения на геолокацию")
            })
            .finally(()=>{
                //setLoadLocationPermission(false)
            })
    },[])


    useEffect(()=>{
        if (locationGranted){
            //setLoadLocation(true)
            //setErrLocation(undefined)

            //Location.getLastKnownPositionAsync()
            const locationOptions = {accuracy: Accuracy.Low}
            Location.getCurrentPositionAsync(locationOptions)
                .then(location=>{
                    setLocation(location)
                })
                .catch(err=>{
                    console.log("error:")
                    console.log(err)
                    setLocation(undefined)
                    //setErrLocation("Ошибка получения геолокации")
                })
                .finally(()=>{
                    //console.log("location finally")
                    //setLoadLocation(false)
                })
        } else {
            setLocation(undefined)
        }
    },[locationGranted])


    useEffect(()=>{
        if (location && mapRef.current){
            mapRef.current.setCamera({
                center: { latitude: location.coords.latitude, longitude: location.coords.longitude}
            })
        }
    },[location])



    const [regionName, setRegionName] = useState(undefined as string|empty)
    const onRegionChange = async (r: Region) => {
        if (locationGranted){
            const regionData = await Location.reverseGeocodeAsync({latitude: r.latitude, longitude: r.longitude})

            setRegionName(regionData[0].city)
            //console.log(regionData)
        }
    }







    return <>

        <View style={[sg.absolute,sg.centerContent,{backgroundColor: 'black'}]}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={[sg.absolute, {backgroundColor: themeObj.mainColors.bgc2}]}
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
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
            />
        </View>

        <View style={s.searchBox}>
            <MapSearchWidget currentRegionName={regionName}/>
        </View>

        <View style={[sg.absolute, {zIndex:1}]} pointerEvents='box-none'>
            <Filters/>
        </View>


        <View style={[sg.absolute, {zIndex:1}]} pointerEvents='box-none'>
            <Settings/>
        </View>

    </>
}
export default MapScreen

