import React from 'react'
import {Pressable, StyleSheet, Text, View} from "react-native";
import {ThemeType} from "@t";
import {useThemeNew} from "@h";
import { inf, sg } from "@u2/utils";
import SearchIc from "@c/SvgIcons/SearchIc";
import FilterIc from "@c/SvgIcons/FilterIc";
import {useDispatch, useSelector} from "react-redux";
import {setAppNavMapMode} from "@rx/appReducer";
import SettingsIc from "@c/SvgIcons/SettingsIc";
import {StateType} from "@rx/store";



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



type SearchWidgetProps = {}
const SearchWidget = ({}:SearchWidgetProps) => {

    const { style:s, themeObj } = useThemeNew(makeStyle)
    const d = useDispatch()

    const mapMode = useSelector((s:StateType)=>s.app.appNav.mapMode)

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
            <Text style={s.text}>Иркутск</Text>
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
    </View>
}
export default SearchWidget