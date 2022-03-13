import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { setAppNavMapMode } from "@rx/appReducer";
import { StateType } from "@rx/store";
import {useThemeNew} from "@h";
import {ThemeType} from "@t";
import SelectVariants from "@c/SelectVariants";
import {useBackHandler} from "@react-native-community/hooks";



const makeStyle = (t: ThemeType) => StyleSheet.create({
    bottomSheet: {
        borderRadius: 30,
        backgroundColor: t.mainColors.bgc0,
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        paddingTop: 0,
    },
    filterTitle: {
        fontFamily: t.font.familyBold,
        fontSize: 24,
        textAlign: 'center',
        color: t.mainColors.secondary1,
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

type SettingsProps = {}
const Settings = ({}:SettingsProps) => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { style:s, themeObj, theme, setTheme } = useThemeNew(makeStyle)

    // variables
    const snapPoints = useMemo(() => ['25%','50%','75%'], []);

    const mapMode = useSelector((s:StateType)=>s.app.appNav.mapMode)
    const [index,setIndex] = useState(-1)
    useLayoutEffect(()=>{
        if (bottomSheetRef.current){
            if (mapMode==='settings' && index===-1) bottomSheetRef.current.snapToIndex(0)
            if (mapMode!=='settings' && index>=0) bottomSheetRef.current.close()
        }
    },[mapMode,bottomSheetRef])
    useLayoutEffect(()=>{
        if (bottomSheetRef.current){
            if (mapMode==='settings' && index===-1) onClose()
        }
    },[index,bottomSheetRef])


    const close = () => {
        if (bottomSheetRef.current) {
            if (mapMode==='settings' && index>=0){
                bottomSheetRef.current.close()
                return true
            }
        }
        return false
    }

    useBackHandler(close)

    const d = useDispatch()

    const onClose = useCallback(() => {
        d(setAppNavMapMode('map'))
    },[d])

    // callbacks
    const handleSheetChanges = useCallback((idx: number) => {
        setIndex(idx)
    }, []);



    const normalBoxVariants = useMemo(()=>({
        backgroundColor: 'transparent', //
        borderColor: themeObj.mainColors.secondary4, // <noname>
    }),[themeObj])
    const normalTxtVariants = useMemo(()=>({
        color: themeObj.mainColors.secondary1, // gray dark
        fontFamily: themeObj.font.family,
    }),[themeObj])
    const selectedBoxVariants = useMemo(()=>({
        backgroundColor: themeObj.mainColors.accent2, // Purple
        borderColor: themeObj.mainColors.accent2, // Purple
    }),[themeObj])
    const selectedTxtVariants = useMemo(()=>({
        color: themeObj.mainColors.secondary1 // gray dark
    }),[themeObj])


    return <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={s.bottomSheet}
        handleIndicatorStyle={{backgroundColor: themeObj.mainColors.secondary0}}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} >
            <View style={s.contentContainer}>

                <Text style={s.filterTitle}>Настройки</Text>

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
        </BottomSheet>
}
export default Settings