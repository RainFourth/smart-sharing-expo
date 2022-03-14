import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
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
import Space from "@c/Space";
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



type AvailableApartmentsProps = {}
const AvailableApartments = ({}:AvailableApartmentsProps) => {

    const d = useDispatch()
    const { style:s, themeObj, theme, setTheme } = useThemeNew(makeStyle)
    const { mapMode, bottomBarHeight } = useSelector((s:StateType)=>s.app.appNav)
    const snapPoints = useMemo(()=>[bottomBarHeight], [bottomBarHeight])

    const [bottomSheetSettings, setBottomSheetSettings] = useState(undefined as BottomSheetSettings)

    const [closed, setClosed] = useState(true)
    const [index, setIndex] = useState(undefined as undefined|number)
    useLayoutEffect(()=>{
        // если мы перешли на карту, но лист всё ещё закрыт...
        if (['map','search'].includes(mapMode) && closed) setBottomSheetSettings({index: 0})
        if (!['map','search'].includes(mapMode) && !closed) setBottomSheetSettings({close: true})
    },[mapMode])
    /*useLayoutEffect(()=>{
        // если лист закрылся, но мы всё ещё в настройках...
        if (closed && mapMode==='settings') d(setAppNavMapMode('map'))
        if (!closed && mapMode!=='settings') d(setAppNavMapMode('settings'))
    },[closed])*/

    /*useBackHandler(()=>{
        if (mapMode==='settings'){
            d(setAppNavMapMode('map'))
            return true
        }
        return false
    })*/


    const {
        city, apartments: { apartments, error: apError },
        groupedApartments, addressFilter, selectedApartments
    } = useSelector((s:StateType)=>s.apartments.selectedCity)

    const [cnt, setCnt] = useState(undefined as undefined|number)
    useEffect(()=>{
        const idsSet = selectedApartments.idsSet
        if (idsSet.size>0) setCnt(idsSet.size)
        else if (groupedApartments) setCnt(groupedApartments.reduce((cnt,group)=>cnt+group.ids.length,0))
    },[groupedApartments, selectedApartments])

    return <BottomSheet
        snapPoints={snapPoints}
        initialSettings={{index: 0}}
        bodyBgcColor={themeObj.mainColors.bgc0}
        newSettings={bottomSheetSettings}
        enableCloseOnZeroSnap={false}
        onChange={(closed,index) => {
            setClosed(closed)
            setIndex(index)
        }}
    >
        <BottomSheetHeader>
            <View style={s.headerBox}>
                <View style={s.dash}/>
                <View style={[sg.absolute, sg.centerContent]}>
                    <Text style={s.headerTitle}>{cnt===undefined ? '' : cnt+' вариантов'}</Text>
                </View>
            </View>
        </BottomSheetHeader>
        <BottomSheetBody>
            <View style={s.contentBox}>

            </View>
        </BottomSheetBody>
    </BottomSheet>
}
export default AvailableApartments