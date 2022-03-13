import React, {useEffect, useRef, useState} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps'
import {View} from 'react-native'
import {groupBy, reduce, halfUp} from "@u2/utils";
import MapSearchWidget from "@sc/App/Apartments/Map/MapSearchWidget";
import {useThemeNew} from "@h";
import {useBackHandler} from "@react-native-community/hooks";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import {setAppNavMapMode, setLocationPermissionGranted} from "@rx/appReducer";
import * as Location from 'expo-location'
import {Accuracy} from "expo-location";
import {sg} from "@u2/styleGlobal";
import MapMarker2 from "@c/MapMarker2";
import {prettyPrint} from "@u";
import {fetchApartmentsInCity, setGroupedApartments, setSelectedCity} from "@rx/apartmentsReducer";




// todo useNavigation hook
export type MapScreenType = {}


const MapScreen = ({}:MapScreenType) => {

    const { themeObj } = useThemeNew()
    const { appNav: { mapMode }, /*location: { granted: locationGranted }*/} = useSelector((s: StateType) => s.app)
    const d = useDispatch()

    useBackHandler(()=>{
        if (mapMode !== 'map') {
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })

    const mapRef = useRef<MapView>(null)


    const [mapReady, setMapReady] = useState(false)
    const onMapReady = () => setMapReady(true)
    const onMapLoaded = () => {
        //alert("Map loaded!")
    }




    //const [location, setLocation] = useState(undefined as empty|Location.LocationObject)

    /*useEffect(()=>{
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
    },[])*/


    /*useEffect(()=>{
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
    },[locationGranted])*/


    /*useEffect(()=>{
        if (location && mapRef.current){
            mapRef.current.setCamera({
                center: { latitude: location.coords.latitude, longitude: location.coords.longitude}
            })
        }
    },[location])*/




    /*const [regionName, setRegionName] = useState(undefined as string|empty)
    const onRegionChange = async (r: Region) => {
        if (locationGranted){
            const regionData = await Location.reverseGeocodeAsync({latitude: r.latitude, longitude: r.longitude})

            setRegionName(regionData[0].city)
            //console.log(regionData)
        }
    }*/

    const { city, apartments: { apartments, error: apError }, groupedApartments, addressFilter } = useSelector((s:StateType)=>s.apartments.selectedCity)
    const [addressFilterSet, setAddressFilterSet] = useState(new Set<string>())
    useEffect(()=>{
        setAddressFilterSet(new Set(addressFilter.map(p=>p.type+" "+p.id)))
    },[addressFilter])
    useEffect(()=>{
        d(fetchApartmentsInCity(city.id))
        mapRef.current?.setCamera({
            //zoom: 14,
            center: {
                latitude: city.location.lat,
                longitude: city.location.lon
            }
        })
    },[city])
    useEffect(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') d(setSelectedCity(addressFilter[0]))
        if (apartments){
            const groupedAp = reduce(
                groupBy(
                    addressFilterSet.size===0 ? apartments : apartments.filter(
                        ap => addressFilterSet.has('district '+ap.districtId) || addressFilterSet.has('street '+ap.streetId)
                    ),
                    ap => halfUp(ap.coordinates.latitude, 3)+" "+halfUp(ap.coordinates.longitude, 3)
                ),
                v => ({
                    ids: [v.id],
                    minPrice: v.price,
                    coordinates: {
                        latitude: v.coordinates.latitude,
                        longitude: v.coordinates.longitude
                }}),
                (v,nv)=>{
                    nv.ids.push(v.id)
                    nv.minPrice = Math.min(v.price, nv.minPrice)
                    return nv
                }
            )
            d(setGroupedApartments([...groupedAp.values()]))
        }
    },[apartments, addressFilter, addressFilterSet])
    useEffect(()=>{
        if (apError) alert("Не удалось загрузить координаты квартир\n"+prettyPrint(apError,'str'))
    },[apError])



    return <View style={[sg.absolute,sg.centerContent,{backgroundColor: 'black'}]}>
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={[sg.absolute, {backgroundColor: themeObj.mainColors.bgc2}]}
            onMapReady={onMapReady}
            onMapLoaded={onMapLoaded}
            initialRegion={{
                latitude: city.location.lat,
                longitude: city.location.lon,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            }}
            showsBuildings={true}
            customMapStyle={themeObj.mapStyle}

            /*onRegionChangeComplete={onRegionChange}*/
            /*showsUserLocation={true}*/
        >
            {/*
                WARNING!!! Custom markers lag issue, to solve:
                1) change key to index (key={indexInArray})
                2) disable props tracksViewChanges={false} or add icon props instead of image
            */}
            { mapReady && groupedApartments?.map((ap,i)=><Marker
                tracksViewChanges={false}
                key={i}
                coordinate={ap.coordinates}
                onPress={()=>console.log('marker pressed')}
                >
                    <MapMarker2
                        count={ap.ids.length}
                        price={ap.minPrice}
                        selected={false}
                    />
                </Marker>
            )}
        </MapView>


        <MapSearchWidget />

    </View>
}
export default MapScreen

