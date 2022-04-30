import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {ThemeType} from "@t";
import {useThemeNew} from "@h";
import {empty, inf, makeSearchRegexp} from "@u2/utils";
import SearchIc from "@c/SvgIcons/SearchIc";
import FilterIc from "@c/SvgIcons/FilterIc";
import {useDispatch, useSelector} from "react-redux";
import {setAppNavMapMode} from "@rx/appReducer";
import SettingsIc from "@c/SvgIcons/SettingsIc";
import {StateType} from "@rx/store";
import {useBackHandler} from "@react-native-community/hooks";
import {useKeyboard} from "@h/useKeyboard";
import Axios from 'axios'
import {GOOGLE_WEB_API_KEY} from "@env";
import {sg} from "@u2/styleGlobal";
import Space from "@c/Space";
import {DistrictType, PlaceType, StreetType} from "@r/apartmentsRepoMockData";
import {fetchDistricts, fetchStreets, setAddressFilter} from "@rx/apartmentsReducer";
import {prettyPrint} from "@u";
import {getDimens} from "@u2/getDimens";
import CheckMarkIc from "@c/SvgIcons/CheckMarkIc";
import Checkbox from "expo-checkbox";
import {useDebounce} from "@h/useDebounce";






const makeStyle = (t: ThemeType, variants: boolean) => StyleSheet.create({
    searchBox: {
        position: 'absolute', top: 44, left: 15, right: 15,
        //height: !variants ? 49 : undefined,
        //minHeight: !variants ? undefined :
        maxHeight: !variants ? undefined : getDimens().h*0.4,
        flexDirection: 'column',
        backgroundColor: t.mainColors.bgc0,
        borderRadius: !variants ? inf : 8,
        //shadowOffset: { width:0, height:0 }, shadowRadius: 10, shadowColor: "black", // doesn't work // todo for ios
        elevation: 10,
    },

    inputBox: {
        //height: !variants ? 49 : 40,
        height: !variants ? 49 : 40,
        //marginBottom: !variants ? undefined : -8,
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        flex:1,
        textAlignVertical: 'center',
        fontSize: 20,
        fontFamily: t.font.family,
        color: t.mainColors.onBgc0
    },

    line: {
        marginLeft: 50, marginRight: 50,
        height: 1,
        backgroundColor: t.mainColors.secondary4
    },

    variantsList: {
        width: '100%', paddingVertical: 5
    },
    selectedVariant: {
        paddingHorizontal: 6,
        borderRadius: inf,
        marginRight: 6,
        height: 22,
        alignItems: 'center',
        backgroundColor: t.mainColors.accent3,
        borderColor: t.mainColors.accent3,
    },
    deleteVariant: {
        fontFamily: t.font.font.normal,
        fontSize: 20,
        color: t.mainColors.secondary0,
        marginTop: -2,
        marginRight: 2,
    },
    selectedVariantName: {
        fontFamily: t.font.font.normal,
        fontSize: 13,
        color: t.mainColors.secondary0,
    },

    list: {
        //marginRight: 50,
        //maxHeight: '20%',
        //height: '80%',
        //backgroundColor: 'red',
    },
    item: {
        width: '100%',
    },
    suggestionMain: {
        fontFamily: t.font.font.normal,
        fontSize: 16,
        color: t.mainColors.secondary0
    },
    suggestionSec: {
        fontFamily: t.font.font.normal,
        fontSize: 12,
        color: t.mainColors.secondary0
    },

})



type SearchWidgetProps = { }
const MapSearchWidget = ({ }:SearchWidgetProps) => {

    const { appNav: { mapMode } } = useSelector((s:StateType)=>s.app)
    const { selectedCity: { city, districts, streets, addressFilter }, cities } = useSelector((s:StateType)=>s.apartments)
    const { style:s, themeObj } = useThemeNew(t=>makeStyle(t, mapMode==='search'),[mapMode])
    const d = useDispatch()
    const inputRef = useRef<TextInput>(null)
    const [isKbdShown] = useKeyboard()


    const [availablePlaces, setAvailablePlaces] = useState([] as PlaceType[])

    useEffect(()=>{
        if (city){
            d(fetchDistricts(city.id))
            d(fetchStreets(city.id))
        }
        setSearchText('')
    },[city.id])
    const [foundParts, setFoundParts] = useState([] as PlaceType[])
    useEffect(()=>{
        let cs = cities.cities ?? []
        let ds = districts.districts ?? []
        let ss = streets.streets ?? []
        setAvailablePlaces([...cs,...ds,...ss])
        setFoundParts(ds)

        if (cities.error) alert('Ошибка получения городов:\n'+prettyPrint(cities.error))
        if (districts.error) alert('Ошибка получения округов/районов города:\n'+prettyPrint(districts.error))
        if (streets.error) alert('Ошибка получения улиц/переулков/микрорайонов города:\n'+prettyPrint(streets.error))

    },[cities,districts,streets])



    useBackHandler(()=>{
        if (inputRef.current?.isFocused()){
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })

    useEffect(()=>{
        if (mapMode!=='search') blurInput()
    },[mapMode])

    const blurInput = () => {
        inputRef.current?.blur()
        Keyboard.dismiss()
    }

    const onInputFocus = () => d(setAppNavMapMode('search'))
    //const onInputBlur = () => d(setAppNavMapMode('map'))


    const onTouchInput = () => {
        if (!isKbdShown && inputRef.current){
            inputRef.current.blur()
            inputRef.current.focus()
        }
    }


    const [searchText, setSearchText] = useState('')
    useDebounce(() => {
        if (!searchText) setFoundParts(districts?.districts ?? [])
        else {
            const regexp = makeSearchRegexp(searchText)
            setFoundParts(availablePlaces.filter(p => regexp.test(p.name)))
        }
    },500, [searchText])



    const onSettings = () => d(setAppNavMapMode(mapMode!=='settings' ? 'settings' : 'map'))
    const onFilters = () => d(setAppNavMapMode(mapMode!=='filters' ? 'filters' : 'map'))

    return <View style={s.searchBox}>

        <View style={[s.inputBox]}>
            {
                mapMode!=="search" ?
                    <View style={[{height: '100%', width: 50}, sg.center]}>
                        <SearchIc color={themeObj.mainColors.secondary0} size={24} />
                    </View>
                    :
                    <Space w={50}/>
            }


            <View style={{flex:1}}>
                <TextInput
                    onTouchStart={onTouchInput}
                    ref={inputRef}
                    value={searchText}
                    onChangeText={setSearchText}
                    onFocus={onInputFocus}
                    //onBlur={onInputBlur}
                    style={s.text}
                    multiline={false}
                    placeholder={addressFilter.length===0 ? city.name : addressFilter.map(p=>p.name).join('; ')}
                    placeholderTextColor={themeObj.mainColors.secondary2}
                />
            </View>


            {
                mapMode!=="search" && <Pressable
                    onPress={onSettings}
                    style={[{height: '100%', width: 30}, sg.center]}>
                    <SettingsIc color={themeObj.mainColors.secondary0} size={24} />
                </Pressable>
            }


            <Pressable
                onPress={onFilters}
                style={[{height: '100%', width: 50}, sg.center]}>
                <FilterIc color={themeObj.mainColors.onBgc0} size={24} />
            </Pressable>

        </View>

        {
            mapMode==="search" && <>
                <View style={s.line} />
                {
                    addressFilter.length>0 && <ScrollView
                        horizontal={true} style={s.variantsList} keyboardShouldPersistTaps='always'
                    >
                        <Space w={50}/>
                        {
                            addressFilter.map(part=><Pressable
                                style={[sg.row, s.selectedVariant]} key={part.typeName+part.id}
                                onPress={()=>d(setAddressFilter(addressFilter.filter(el=>el!==part)))}
                            >
                                <Text style={s.deleteVariant}>×</Text>
                                <Text style={s.selectedVariantName}>{part.name}</Text>
                            </Pressable>)
                        }
                    </ScrollView>
                }

                <ScrollView style={s.list} keyboardShouldPersistTaps='always'>
                    {
                        foundParts.map(part => {
                            const checked = addressFilter.includes(part)
                            const onCheck = () => {
                                if (checked) d(setAddressFilter(addressFilter.filter(el=>el!==part)))
                                else d(setAddressFilter([...addressFilter, part]))
                            }
                            return <View
                                style={[sg.row, {alignItems: 'center', width:'100%', height: 50, }]}
                                key={part.typeName + part.id}
                                >
                                    <Space w={50}/>

                                    <Pressable
                                        style={{flex:1}}
                                        onPress={()=>{
                                            d(setAddressFilter([part]))
                                            d(setAppNavMapMode('map'))
                                            setSearchText('')
                                        }}
                                    >
                                        <Text style={s.suggestionMain}>{part.name}</Text>
                                        <Text style={s.suggestionSec}>{part.typeName}</Text>
                                    </Pressable>

                                    {
                                        part.type==='city' ? <Space w={50}/> : <Pressable
                                                style={[sg.center, {width: 50, height: '100%'}]}
                                                onPress={onCheck}
                                            >
                                                <Checkbox
                                                    //style={s.checkbox}
                                                    value={checked}
                                                    onValueChange={onCheck}
                                                    color={themeObj.mainColors.secondary0}
                                                />
                                            </Pressable>
                                    }
                                </View>
                            }
                        )
                    }
                </ScrollView>
                <Space h={10} />
            </>
        }


    </View>
}
export default MapSearchWidget







/*

    const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
    /!**
     * Prediction's type returned from Google Places Autocomplete API
     * https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
     *!/
    type PredictionType = {
        description: string
        place_id: string
        reference: string
        matched_substrings: any[]
        tructured_formatting: Object
        terms: Object[]
        types: string[]
    }

    /!**
     * Grab predictions on entering text
     *    by sending reqyest to Google Places API.
     * API details: https://developers.google.com/maps/documentation/places/web-service/autocomplete
     *!/
    const getPredictions = async () => {
        const term = 'ирк'
        const response = await Axios.get(
            `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_WEB_API_KEY}&input=${term}`
        )
        console.log(response.data)
    }

*/
