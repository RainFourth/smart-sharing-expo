import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import MapView, {LatLng, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps'
import {LayoutChangeEvent, View} from 'react-native'
import {groupBy, reduce, halfUp, empty, inRange} from "@u2/utils";
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
import {
    fetchApartmentsInCity,
    GroupedApartments,
    setGroupedApartments, setSelectedApartments,
    setSelectedCity
} from "@rx/apartmentsReducer";
import AvailableApartments from "@sc/App/Apartments/Map/AvailableApartments";
import {PlaceType} from "@r/apartmentsRepoMockData";
import {useDebounce} from "@h/useDebounce";




// todo useNavigation hook
export type MapScreenType = {}


const latDelta = 0.2
const lonDelta = 0.2

const MapScreen = ({}:MapScreenType) => {

    const { themeObj } = useThemeNew()
    const { appNav: { mapMode }, /*location: { granted: locationGranted }*/} = useSelector((s: StateType) => s.app)
    const d = useDispatch()

    useLayoutEffect(()=>{
        d(setAppNavMapMode('map'))
        return ()=>{d(setAppNavMapMode('none'))}
    },[])

    useBackHandler(()=>{
        if (mapMode !== 'map') {
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })

    const mapRef = useRef<MapView>(null)
    const map = mapRef.current


    const [mapReady, setMapReady] = useState(false)
    const onMapReady = () => setMapReady(true)
    const onMapLoaded = () => {/*alert("Map loaded!")*/}


    const [mapInfo, setMapInfo] = useState(undefined as undefined | {
        latDelta: number, lonDelta: number, angle: number, zoom: number
    })
    const [mapDimens, setMapDimens] = useState(undefined as undefined|{ w:number, h:number })



    useEffect(()=>{
        console.log(mapInfo)
    },[mapInfo])


    const {
        city, apartments: { apartments, error: apError },
        groupedApartments, addressFilter, selectedApartments
    } = useSelector((s:StateType)=>s.apartments.selectedCity)


    const [addressFilterSet, setAddressFilterSet] = useState(new Set<string>())
    useEffect(()=>{
        setAddressFilterSet(new Set(addressFilter.map(p=>p.type+" "+p.id)))
    },[addressFilter])
    useEffect(()=>{
        d(fetchApartmentsInCity(city.id))
        mapRef.current?.setCamera({
            zoom: 12,
            center: {
                latitude: city.location.lat,
                longitude: city.location.lon
            }
        })
    },[city])
    /*useEffect(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') {
            d(setSelectedCity(addressFilter[0]))
        } else if (apartments){
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
    },[apartments, addressFilter, addressFilterSet])*/

    /*useDebounce(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') {
            d(setSelectedCity(addressFilter[0]))
        } else if (apartments && mapInfo){
            const ap = addressFilterSet.size===0 ? [...apartments] : apartments.filter(
                ap => addressFilterSet.has('district '+ap.districtId) || addressFilterSet.has('street '+ap.streetId)
            )
            const groupedAp = [] as GroupedApartments[]
            const screenDistSq = mapInfo.latDelta*mapInfo.latDelta + mapInfo.lonDelta*mapInfo.lonDelta
            while (ap.length>0){
                const first = ap.splice(0, 1)[0];

                const group: GroupedApartments = {
                    ids: [first.id],
                    minPrice: first.price,
                    exact: true,
                    coordinates: {
                        latitude: first.coordinates.latitude,
                        longitude: first.coordinates.longitude
                    }
                }
                let latSum = group.coordinates.latitude
                let lonSum = group.coordinates.longitude

                for (let i = 0; i < ap.length; i++){
                    const item = ap[i]
                    const dLat = item.coordinates.latitude - latSum/group.ids.length
                    const dLon = item.coordinates.longitude - lonSum/group.ids.length
                    const dAngle = Math.atan2(dLat, dLon)/Math.PI*180+180
                    const angle = (dAngle + mapInfo.angle)%360
                    const dLatAbs = Math.abs(dLat)
                    const dLonAbs = Math.abs(dLon)
                    const distSq = dLat*dLat+dLon*dLon
                    const delta = (angle>300 || angle<60 || angle>120 && angle<240) ? 0.006 : 0.0007 // задать коэффициенты здесь
                    if ( distSq / screenDistSq < delta ){
                        group.exact = group.exact && dLatAbs<0.005 && dLonAbs<0.005
                        latSum += item.coordinates.latitude
                        lonSum += item.coordinates.longitude
                        group.ids.push(item.id)
                        group.minPrice = Math.min(group.minPrice, item.price)
                        ap.splice(i,1)
                        i--
                    }
                }
                group.coordinates.latitude = latSum/group.ids.length
                group.coordinates.longitude = lonSum/group.ids.length

                groupedAp.push(group)
            }
            d(setGroupedApartments(groupedAp))
        }
    },700, [apartments, addressFilter, addressFilterSet, mapInfo])*/
    /*useDebounce(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') {
            d(setSelectedCity(addressFilter[0]))
        } else if (apartments && mapInfo){
            const ap = addressFilterSet.size===0 ? [...apartments] : apartments.filter(
                ap => addressFilterSet.has('district '+ap.districtId) || addressFilterSet.has('street '+ap.streetId)
            )
            const groupedAp = [] as GroupedApartments[]
            const screenDistSq = mapInfo.latDelta*mapInfo.latDelta + mapInfo.lonDelta*mapInfo.lonDelta
            while (ap.length>0){
                const first = ap.splice(0, 1)[0];

                const group: GroupedApartments = {
                    ids: [first.id],
                    minPrice: first.price,
                    exact: true,
                    coordinates: {
                        latitude: first.coordinates.latitude,
                        longitude: first.coordinates.longitude
                    }
                }
                let latSum = group.coordinates.latitude
                let lonSum = group.coordinates.longitude

                for (let i = 0; i < ap.length; i++){
                    const item = ap[i]
                    const dLat = item.coordinates.latitude - latSum/group.ids.length
                    const dLon = item.coordinates.longitude - lonSum/group.ids.length
                    const dAngle = Math.atan2(dLat, dLon)/Math.PI*180+180
                    const angle = (dAngle + mapInfo.angle)%360
                    const dLatAbs = Math.abs(dLat)
                    const dLonAbs = Math.abs(dLon)
                    const distSq = dLat*dLat+dLon*dLon
                    const delta = (angle>300 || angle<60 || angle>120 && angle<240) ? 0.006 : 0.0007 // задать коэффициенты здесь
                    if ( distSq / screenDistSq < delta ){
                        group.exact = group.exact && dLatAbs<0.005 && dLonAbs<0.005
                        latSum += item.coordinates.latitude
                        lonSum += item.coordinates.longitude
                        group.ids.push(item.id)
                        group.minPrice = Math.min(group.minPrice, item.price)
                        ap.splice(i,1)
                        i--
                    }
                }
                group.coordinates.latitude = latSum/group.ids.length
                group.coordinates.longitude = lonSum/group.ids.length

                groupedAp.push(group)
            }
            d(setGroupedApartments(groupedAp))
        }
    },700, [apartments, addressFilter, addressFilterSet, mapInfo])*/
    /*useDebounce(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') {
            d(setSelectedCity(addressFilter[0]))
        } else if (apartments && mapInfo){
            const ap = addressFilterSet.size===0 ? [...apartments] : apartments.filter(
                ap => addressFilterSet.has('district '+ap.districtId) || addressFilterSet.has('street '+ap.streetId)
            )
            const groupedAp = [] as GroupedApartments[]
            const screenDistSq = mapInfo.latDelta*mapInfo.latDelta + mapInfo.lonDelta*mapInfo.lonDelta
            while (ap.length>0){
                const first = ap.splice(0, 1)[0];

                const group: GroupedApartments = {
                    ids: [first.id],
                    minPrice: first.price,
                    exact: true,
                    coordinates: {
                        latitude: first.coordinates.latitude,
                        longitude: first.coordinates.longitude
                    }
                }
                let latSum = group.coordinates.latitude
                let lonSum = group.coordinates.longitude

                for (let i = 0; i < ap.length; i++){
                    const item = ap[i]
                    const dLat = item.coordinates.latitude - latSum/group.ids.length
                    const dLon = item.coordinates.longitude - lonSum/group.ids.length
                    const dAngle = Math.atan2(dLat, dLon)/Math.PI*180+180
                    const angle = (dAngle + mapInfo.angle)%360
                    const dLatAbs = Math.abs(dLat)
                    const dLonAbs = Math.abs(dLon)
                    const distSq = dLat*dLat+dLon*dLon
                    const delta = (angle>300 || angle<60 || angle>120 && angle<240) ? 0.006 : 0.002 // задать коэффициенты здесь
                    const screenDistSq = (360/2**(mapInfo.zoom-1))**2
                    if ( distSq / screenDistSq < delta ){
                        group.exact = group.exact && dLatAbs<0.005 && dLonAbs<0.005
                        latSum += item.coordinates.latitude
                        lonSum += item.coordinates.longitude
                        group.ids.push(item.id)
                        group.minPrice = Math.min(group.minPrice, item.price)
                        ap.splice(i,1)
                        i--
                    }
                }
                group.coordinates.latitude = latSum/group.ids.length
                group.coordinates.longitude = lonSum/group.ids.length

                groupedAp.push(group)
            }
            d(setGroupedApartments(groupedAp))
        }
    },700, [apartments, addressFilter, addressFilterSet, mapInfo])*/
    useDebounce(()=>{
        if (addressFilter[0] && addressFilter[0].type==='city') {
            d(setSelectedCity(addressFilter[0]))
        } else if (apartments && mapInfo){
            const ap = addressFilterSet.size===0 ? [...apartments] : apartments.filter(
                ap => addressFilterSet.has('district '+ap.districtId) || addressFilterSet.has('street '+ap.streetId)
            )
            const groupedAp = [] as GroupedApartments[]
            while (ap.length>0){
                const first = ap.splice(0, 1)[0];

                const group: GroupedApartments = {
                    ids: [first.id],
                    minPrice: first.price,
                    exact: true,
                    coordinates: {
                        latitude: first.coordinates.latitude,
                        longitude: first.coordinates.longitude
                    }
                }
                let latSum = group.coordinates.latitude
                let lonSum = group.coordinates.longitude

                for (let i = 0; i < ap.length; i++){
                    const item = ap[i]

                    const dLat = item.coordinates.latitude - latSum/group.ids.length
                    const dLon = item.coordinates.longitude - lonSum/group.ids.length
                    const dLatAbs = Math.abs(dLat)
                    const dLonAbs = Math.abs(dLon)

                    const dist = Math.sqrt(dLat*dLat+dLon*dLon)

                    const dAngle = Math.atan2(dLat, dLon)/Math.PI*180+180
                    const angle = (dAngle + mapInfo.angle)%360

                    let delta
                    let threshold
                    const angleR = angle/180*Math.PI
                    const angleDelta = 40
                    if (angle>360-angleDelta || angle<angleDelta || angle>180-angleDelta && angle<180+angleDelta){
                        delta = dist*Math.abs(Math.cos(angleR))
                        threshold = 0.1
                    } else {
                        delta = dist*Math.abs(Math.sin(angleR))
                        threshold = 0.05
                    }

                    const screenDist = (360/2**(mapInfo.zoom-1))

                    console.log({
                        dist, dAngle, angle, delta, threshold, angleR, screenDist
                    })

                    if ( dist / screenDist < threshold ){
                        group.exact = group.exact && dLatAbs<0.005 && dLonAbs<0.005
                        latSum += item.coordinates.latitude
                        lonSum += item.coordinates.longitude
                        group.ids.push(item.id)
                        group.minPrice = Math.min(group.minPrice, item.price)
                        ap.splice(i,1)
                        i--
                    }
                }
                group.coordinates.latitude = latSum/group.ids.length
                group.coordinates.longitude = lonSum/group.ids.length

                groupedAp.push(group)
            }
            d(setGroupedApartments(groupedAp))
        }
    },700, [apartments, addressFilter, addressFilterSet, mapInfo])


    useEffect(()=>{
        if (apError) alert("Не удалось загрузить координаты квартир\n"+prettyPrint(apError,'str'))
    },[apError])

    const onMarkerSelect = (apIds: number[]) => {
        const idsSet = selectedApartments.idsSet
        if (apIds.every(id=>idsSet.has(id))) {
            apIds.forEach(id=>idsSet.delete(id))
        }
        else apIds.forEach(id=>idsSet.add(id))
        d(setSelectedApartments(idsSet))
    }

    const onRegionChange = async (r: Region) => {
        if (map) {
            const camera = await map.getCamera()
            const a = camera.heading
            const { latitudeDelta: dLat, longitudeDelta: dLon } = r
            const newInfo = {
                latDelta: dLat,
                lonDelta: dLon,
                angle: a,
                zoom: camera.zoom,
            }
            if (JSON.stringify(newInfo)!==JSON.stringify(mapInfo)) {
                setMapInfo(newInfo)

                /*if (dimens){
                    const { w, h } = dimens
                    const aa = Math.atan2(h,w)/Math.PI*180
                    const rLon = (a<aa || a>(180-aa) && a<(180+aa) || a>(360-aa)) ?
                        dLon/2*Math.abs(Math.cos(a/180*Math.PI)) : dLon/2*Math.abs(Math.sin(a/180*Math.PI))*w/h
                    console.log('dLon',rLon*2)
                }*/
                /*if (dimens){
                    const { w, h } = dimens
                    const aa = Math.atan2(h,w)/Math.PI*180
                    const rLon = dLon/2/Math.abs(Math.sin((180-a-aa)/180*Math.PI))
                    console.log('dLon',rLon*2)
                }*/
                /*if (dimens){
                    const { w, h } = dimens
                    const aa = Math.atan2(w,h)/Math.PI*180
                    const rLon = dLon/2/Math.abs(Math.sin((a+aa)/180*Math.PI))
                    console.log('dLon',rLon*2)
                }*/
                //console.log('zzz',180/2**newInfo.zoom)
                //console.log('zzz',360/2**newInfo.zoom)
                console.log('zzz',360/2**(newInfo.zoom-1))
            }
            //setZoom(camera.zoom)
            //console.log('camera:',camera)
            //console.log('region:',r)
        }
        //setMapDeltaSq(r.latitudeDelta**2+r.longitudeDelta**2)
        //setMapDeltaTg(r.latitudeDelta/r.longitudeDelta)

        //console.log(r.latitudeDelta, r.longitudeDelta)
    }

    /*useEffect(()=>{
        if (mapInfo){
            console.log('mapInfo:',mapInfo)
            console.log('normalized minDelta:',Math.abs(Math.cos(mapInfo.angle))*Math.min(mapInfo.lonDelta, mapInfo.latDelta))
        }
    },[mapInfo])*/

    const onMapLayout = ({nativeEvent: {layout: { x, y, width:w, height:h }}}: LayoutChangeEvent) => {
        setMapDimens({w,h})
        //console.log('w:',w,'h:',h)
        //console.log('atan2',Math.atan2(w,h)/Math.PI*180)
        //console.log('onMainFrameLayout: ',x,y,w,h)
        // => onLayout:  0 316.4705810546875 423.5294189453125 436.4706115722656
    }

    return <View style={[sg.absolute,sg.centerContent,{backgroundColor: 'black'}]} >
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={[sg.absolute, {backgroundColor: themeObj.mainColors.bgc2}]}
            onMapReady={onMapReady}
            onMapLoaded={onMapLoaded}
            initialRegion={{
                latitude: city.location.lat,
                longitude: city.location.lon,
                latitudeDelta: 0,
                longitudeDelta: lonDelta,
            }}
            /*initialCamera={{
                center: {
                    latitude: city.location.lat,
                    longitude: city.location.lon
                },
                heading: 0, // направление в градусах относительно севера
                pitch: 0, // угол наклона камеры относительно вертикали, чтобы север был более виден
                zoom: 12,
                altitude: 0,
            }}*/
            moveOnMarkerPress={false}
            showsBuildings={true}
            customMapStyle={themeObj.mapStyle}

            onRegionChangeComplete={onRegionChange}
            /*showsUserLocation={true}*/
            onLayout={onMapLayout}
        >
            {/*
                WARNING!!! Custom markers lag issue, to solve:
                1) change key to index (key={indexInArray})
                2) disable props tracksViewChanges={false} or add icon props instead of image
            */}
            { mapReady && groupedApartments?.map((group,i)=>{
                const idsSet = selectedApartments.idsSet
                let cnt = 0
                group.ids.forEach(id=>{if (idsSet.has(id)) cnt++})
                const selected = cnt===0 ? 'none' : cnt===group.ids.length ? 'all' : 'some'

                return <Marker
                        tracksViewChanges={false}
                        key={i}
                        coordinate={group.coordinates}
                        onPress={()=>onMarkerSelect(group.ids)}
                    >
                        <MapMarker2
                            count={group.ids.length}
                            price={group.minPrice}
                            selected={selected}
                            exact={group.exact}
                        />
                    </Marker>
                }
            )}
        </MapView>


        <MapSearchWidget />

        <AvailableApartments/>

    </View>
}
export default MapScreen




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
