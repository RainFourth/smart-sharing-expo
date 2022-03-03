import React, {useCallback, useEffect, useRef} from 'react'
import {Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {ThemeType} from "@t";
import {useThemeNew} from "@h";
import {empty, inf} from "@u2/utils";
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



const makeStyle = (t: ThemeType) => StyleSheet.create({
    bgc: {
        flex: 1,
        backgroundColor: t.mainColors.bgc0,
        borderRadius: inf, // round corners
        //shadowOffset: { width:0, height:0 }, shadowRadius: 10, shadowColor: "black", // doesn't work
        elevation: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        flex:1,
        textAlignVertical: 'center',
        fontSize: 20,
        fontFamily: t.font.family,
        color: t.mainColors.onBgc0
    }
})



type SearchWidgetProps = {
    currentRegionName?: string|empty
}
const MapSearchWidget = ({ currentRegionName }:SearchWidgetProps) => {

    const { style:s, themeObj } = useThemeNew(makeStyle)
    const { appNav: { mapMode } } = useSelector((s:StateType)=>s.app)
    const d = useDispatch()
    const inputRef = useRef<TextInput>(null)
    const [isKbdShown] = useKeyboard()

    useBackHandler(()=>{
        if (inputRef.current?.isFocused()){
            blurInput()
            return true
        }
        return false
    })

    useEffect(()=>{
        if (mapMode!=='map'){
            blurInput()
        }
    },[mapMode])

    const blurInput = () => {
        inputRef.current?.blur()
        Keyboard.dismiss()
    }

    const onInputFocus = () => {
        d(setAppNavMapMode('map'))
    }

    const onTouchInput = () => {
        if (!isKbdShown && inputRef.current){
            inputRef.current.blur()
            inputRef.current.focus()
        }
    }




    const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'



    /**
     * Prediction's type returned from Google Places Autocomplete API
     * https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
     */
    type PredictionType = {
        description: string
        place_id: string
        reference: string
        matched_substrings: any[]
        tructured_formatting: Object
        terms: Object[]
        types: string[]
    }

    /**
     * Grab predictions on entering text
     *    by sending reqyest to Google Places API.
     * API details: https://developers.google.com/maps/documentation/places/web-service/autocomplete
     */

    const getPredictions = async () => {
        const term = 'ирк'
        const response = await Axios.get(
            `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_WEB_API_KEY}&input=${term}`
        )
        console.log(response.data)
    }














    const onSettings = () => {
        mapMode!=='settings' ? d(setAppNavMapMode('settings')) : d(setAppNavMapMode('map'))
    }
    const onFilters = () => {
        mapMode!=='filters' ? d(setAppNavMapMode('filters')) : d(setAppNavMapMode('map'))
    }

    return <View style={s.bgc}>
        <View style={[{height: '100%', width: 50}, sg.centerContent]}>
            <SearchIc color={themeObj.mainColors.onBgc0} size={24} />
        </View>


        <View style={{flex:1}}>
            <TextInput
                onTouchStart={onTouchInput}
                ref={inputRef}
                onFocus={onInputFocus}
                style={s.text} placeholder={currentRegionName??''}
                placeholderTextColor={themeObj.mainColors.secondary2}
            />
        </View>


        <Pressable
            onPress={onSettings}
            style={[{height: '100%', width: 30}, sg.centerContent]}>
            <SettingsIc color={themeObj.mainColors.onBgc0} size={24} />
        </Pressable>

        <Pressable
            onPress={onFilters}
            style={[{height: '100%', width: 50}, sg.centerContent]}>
            <FilterIc color={themeObj.mainColors.onBgc0} size={24} />
        </Pressable>

        {/*<Pressable
            onPress={getPredictions}
            style={[{height: '100%', width: 50}, sg.centerContent]}>
            <Text>OK</Text>
        </Pressable>*/}

    </View>
}
export default MapSearchWidget