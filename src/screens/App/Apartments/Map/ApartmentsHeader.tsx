import {Pressable, Text, View} from "react-native";
import {sg} from "@u2/styleGlobal";
import {useThemeNew} from "@h";
import {useKeyboard} from "@h/useKeyboard";
import BlurView from "@c/BlurView";
import React from "react";
import Space from "@c/Space";
import FilterIc from "@c/SvgIcons/FilterIc";
import BackArrowIc from "@c/SvgIcons/BackIc";
import {useDispatch, useSelector} from "react-redux";
import {setAppNavMapMode} from "@rx/appReducer";
import {StateType} from "@rx/store";


const ApartmentsHeader = () => {

    const d = useDispatch()
    const { themeObj } = useThemeNew()
    const [kbd] = useKeyboard()
    const { mapMode } = useSelector((s:StateType)=>s.app.appNav)

    const onBack = () => {
        d(setAppNavMapMode('map'))
    }

    const onFilters = () => d(setAppNavMapMode(mapMode!=='filters' ? 'filters' : 'map'))

    return <View style={[sg.absolute,
        { bottom: undefined, height: 88, zIndex: 10, backgroundColor: 'transparent' }]}>

        { !kbd && <BlurView background={themeObj.bottomTabBar.color} blur="40px" /> }

        <View style={[sg.absolute, { top: undefined, paddingBottom: 8 }]}>
            <View style={[sg.row, { height: 24, /*backgroundColor: 'red'*/ }]}>
                <Space w={16}/>
                <Pressable onPress={onBack}
                           style={[sg.center, { width: 24, height: 24 }]}>
                    <BackArrowIc color={themeObj.mainColors.onBgc0} size={16} />
                </Pressable>
                <View style={{ flexGrow:1, alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: themeObj.font.font.w400,
                        color: themeObj.mainColors.onBgc0,
                        fontSize: 18,
                    }}>Иркутск</Text>
                </View>
                <Pressable onPress={onFilters}
                    style={[sg.center, { width: 24, height: 24 }]}>
                    <FilterIc color={themeObj.mainColors.onBgc0} size={24} />
                </Pressable>
                <Space w={16}/>
            </View>
        </View>

    </View>
}
export default ApartmentsHeader