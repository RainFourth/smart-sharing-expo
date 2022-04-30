import React, {useLayoutEffect, useMemo, useState} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppNavMapMode } from "@rx/appReducer";
import { StateType } from "@rx/store";
import {useThemeNew} from "@h";
import {ThemeType} from "@t";
import SelectVariants from "@c/SelectVariants";
import {useBackHandler} from "@react-native-community/hooks";
import BottomSheet, {BottomSheetSettings} from '~/components/BottomSheet/BottomSheet';
import BottomSheetHeader from "@c/BottomSheet/BottomSheetHeader";
import BottomSheetBody from "@c/BottomSheet/BottomSheetBody";
import {inf} from "@u2/utils";
import {sg} from "@u2/styleGlobal";



const makeStyle = (t: ThemeType) => StyleSheet.create({

    headerBox: {
        height: 60, width: '100%',
        flexDirection: 'column',
        alignItems:'center',
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        backgroundColor: t.mainColors.bgc0,
    },
    dash: {
        position: 'absolute', top: 8, marginHorizontal: 'auto',
        width: 40, height: 4,
        borderRadius: inf,
        backgroundColor: t.mainColors.secondary0,
    },
    headerTitle: {
        fontFamily: t.font.font.w500,
        fontSize: 24,
        color: t.mainColors.secondary0,
    },

    contentBox: {
        flex: 1,
        flexDirection: 'column',
        padding: 12,
        paddingTop: 0,
        backgroundColor: t.mainColors.bgc0,
    },
    text: {
        height: 50,
        fontSize: 17,
        textAlignVertical: 'center',
        color: t.mainColors.secondary1,
        fontFamily: t.font.family,
    }
});

const themeNames = ["Светлая","Тёмная"] as const
const themesMap = {
    'light': "Светлая",
    'dark': "Тёмная",
    "Светлая": 'light',
    "Тёмная": 'dark'
}

const snapPoints = ['-10%', '15%']


type SettingsProps = {}
const Settings = ({}:SettingsProps) => {

    const d = useDispatch()
    const { style:s, themeObj, theme, setTheme } = useThemeNew(makeStyle)

    const [bottomSheetSettings, setBottomSheetSettings] = useState(undefined as BottomSheetSettings)

    const mapMode = useSelector((s:StateType)=>s.app.appNav.mapMode)
    const [closed, setClosed] = useState(true)
    useLayoutEffect(()=>{
        // если мы перешли в настройки, но лист всё ещё закрыт...
        if (mapMode==='settings' && closed) setBottomSheetSettings({index: 1})
        if (mapMode!=='settings' && !closed) setBottomSheetSettings({close: true})
    },[mapMode])
    useLayoutEffect(()=>{
        // если лист закрылся, но мы всё ещё в настройках...
        if (closed && mapMode==='settings') d(setAppNavMapMode('map'))
        if (!closed && mapMode!=='settings') d(setAppNavMapMode('settings'))
    },[closed])


    useBackHandler(()=>{
        if (mapMode==='settings'){
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })



    const normalBoxVariants = useMemo(()=>({
        backgroundColor: 'transparent', //
        borderColor: themeObj.mainColors.secondary4, // <noname>
    }),[themeObj])
    const normalTxtVariants = useMemo(()=>({
        color: themeObj.mainColors.secondary1, // gray dark
        fontFamily: themeObj.font.family,
    }),[themeObj])
    const selectedBoxVariants = useMemo(()=>({
        backgroundColor: themeObj.mainColors.accent3, // Purple
        borderColor: themeObj.mainColors.accent3, // Purple
    }),[themeObj])
    const selectedTxtVariants = useMemo(()=>({
        color: themeObj.mainColors.secondary1 // gray dark
    }),[themeObj])


    //console.log('render...')

    return <BottomSheet
        snapPoints={snapPoints}
        initialSettings={{close: true}}
        bodyBgcColor={themeObj.mainColors.bgc0}
        newSettings={bottomSheetSettings}
        enableCloseOnZeroSnap={true}
        onChange={setClosed}
    >
        <BottomSheetHeader>
            <View style={s.headerBox}>
                <View style={s.dash}/>
                <View style={[sg.absolute, sg.center]}>
                    <Text style={s.headerTitle}>Настройки</Text>
                </View>
            </View>
        </BottomSheetHeader>
        <BottomSheetBody>
            <View style={s.contentBox}>
                <Text style={s.text}>Тема</Text>
                <View style={{width: '100%'}}>
                    <SelectVariants
                        variants={themeNames}
                        selected={[themesMap[theme]]}
                        onSelect={(t)=>{
                            //@ts-ignore
                            setTheme(themesMap[t])
                        }}
                        normalBox={normalBoxVariants}
                        normalTxt={normalTxtVariants}
                        selectedBox={selectedBoxVariants}
                        selectedTxt={selectedTxtVariants}
                    />
                </View>
            </View>
        </BottomSheetBody>
    </BottomSheet>
}
export default Settings