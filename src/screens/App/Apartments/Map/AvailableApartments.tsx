import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
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
import HeartEmptyIc from "@c/SvgIcons/HeartEmptyIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import RoomIc from "@c/SvgIcons/RoomIc";
import AreaIc from "@c/SvgIcons/AreaIc";

const testAp1 = require('@im/test-apartments-photo-1.jpg')
const testAp2 = require('@im/test-apartments-photo-2.jpg')



const makeStyle = (t: ThemeType) => StyleSheet.create({

    headerBox: {
        height: 60, width: '100%',
        flexDirection: 'column',
        alignItems:'center',
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        backgroundColor: t.mainColors.bgc0,
        //backgroundColor: 'red',

        /*elevation: 3,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 3,
        shadowColor: 'rgba(176, 176, 176, 0.25)',*/
        //boxShadow: 0px 2px 3px rgba(176, 176, 176, 0.25),

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
        //padding: 12,
        paddingTop: 0,
        backgroundColor: t.mainColors.bgc0,
        //backgroundColor: 'transparent',
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
    const snapPoints = useMemo(()=>[bottomBarHeight, 380, '70%', '100%+headerH'], [bottomBarHeight])

    const [bottomSheetSettings, setBottomSheetSettings] = useState(undefined as BottomSheetSettings)

    const [closed, setClosed] = useState(true)
    const [index, setIndex] = useState(undefined as undefined|number)
    useLayoutEffect(()=>{
        // todo задать массивам тип
        if (!['map','search','apartments1','apartments2','apartmentsFull'].includes(mapMode) && !closed) setBottomSheetSettings({close: true})
        // если мы перешли на карту, но лист всё ещё закрыт...
        else if (['map','search'].includes(mapMode) && (closed||index!==0)) setBottomSheetSettings({index: 0})
        else if ('apartments1'===mapMode && (closed||index!==1)) setBottomSheetSettings({index: 1})
        else if ('apartments2'===mapMode && (closed||index!==2)) setBottomSheetSettings({index: 2})
        else if ('apartmentsFull'===mapMode && (closed||index!==3)) setBottomSheetSettings({index: 3})
    },[mapMode])
    useLayoutEffect(()=>{
        // если лист был свёрнут, но мы всё еще в апартаментах...
        if ((closed || !index) && mapMode==='apartments1') d(setAppNavMapMode('map'))
        else if (!closed && index===1 && mapMode!=='apartments1') d(setAppNavMapMode('apartments1'))
        else if (!closed && index===2 && mapMode!=='apartments2') d(setAppNavMapMode('apartments2'))
        else if (!closed && index===3 && mapMode!=='apartmentsFull') d(setAppNavMapMode('apartmentsFull'))
    },[index, closed])
    /*useLayoutEffect(()=>{
        // если лист закрылся, но мы всё ещё в настройках...
        if (closed && mapMode==='settings') d(setAppNavMapMode('map'))
        if (!closed && mapMode!=='settings') d(setAppNavMapMode('settings'))
    },[closed])*/

    /*useEffect(()=>{
        console.log(index,closed)
    },[index,closed])*/

    /*useEffect(()=>{
        console.log('mapMode:',mapMode)
    },[mapMode])*/


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
        //bodyBgcColor='transparent'
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
                <View style={[sg.absolute, sg.center]}>
                    <Text style={s.headerTitle}>{cnt===undefined ? '' : cnt+' вариантов'}</Text>
                </View>
            </View>
        </BottomSheetHeader>
        <BottomSheetBody>
            <View style={s.contentBox}>

                <ScrollView keyboardShouldPersistTaps='always'>

                    { mapMode==='apartmentsFull' && <Space h={100}/> }

                    {
                        function (){
                            let a = <><Space h={16}/>

                            <ScrollView horizontal keyboardShouldPersistTaps='always'>
                                <Space w={8}/>

                                <View style={{ marginHorizontal: 8 }}>
                                    <Image style={{ borderRadius: 10, width: 340, height: 180 }} source={testAp1} />
                                    <View style={{ position: 'absolute', top: 12, right: 10 }}>
                                        <HeartEmptyIc color={'black'} size={25}/>
                                    </View>
                                </View>

                                <View style={{ marginHorizontal: 8 }}>
                                    <Image style={{ borderRadius: 10, width: 340, height: 180 }} source={testAp2} />
                                    <View style={{ position: 'absolute', top: 12, right: 10 }}>
                                        <HeartEmptyIc color={'black'} size={25}/>
                                    </View>
                                </View>

                                <Space w={8}/>
                            </ScrollView>

                            <View style={[sg.row, sg.center, { width: '100%', height: 21 }]}>
                                <View style={{
                                    width: 7, height: 7, marginHorizontal: 7, borderRadius: inf,
                                    backgroundColor: themeObj.mainColors.accent0
                                }}/>
                                <View style={{
                                    width: 7, height: 7, marginHorizontal: 7, borderRadius: inf,
                                    backgroundColor: themeObj.mainColors.accent3
                                }}/>
                                <View style={{
                                    width: 7, height: 7, marginHorizontal: 7, borderRadius: inf,
                                    backgroundColor: themeObj.mainColors.accent3
                                }}/>
                                <View style={{
                                    width: 7, height: 7, marginHorizontal: 7, borderRadius: inf,
                                    backgroundColor: themeObj.mainColors.accent3
                                }}/>
                            </View>

                            <Space h={8}/>

                            <View style={[sg.row, {  }]}>
                                <Space w={16}/>
                                <LocationIc color={themeObj.mainColors.secondary0} size={18} />
                                <Space w={8}/>
                                <Text style={{
                                    fontFamily: themeObj.font.font.w400,
                                    color: themeObj.mainColors.secondary0,
                                    fontSize: 16,
                                }}>Иркутск, пер. Черемховский 6</Text>
                            </View>

                            <Space h={14}/>

                            <View style={[sg.row, { alignItems: 'flex-end' }]}>
                                <Space w={16}/>
                                <RoomIc color={themeObj.mainColors.secondary0} size={18} />
                                <Space w={8}/>
                                <Text style={{
                                    fontFamily: themeObj.font.font.w400,
                                    color: themeObj.mainColors.secondary0,
                                    fontSize: 16,
                                }}>2-ком</Text>

                                <Space w={16}/>
                                <AreaIc color={themeObj.mainColors.secondary0} size={18} />
                                <Space w={8}/>
                                <Text style={{
                                    fontFamily: themeObj.font.font.w400,
                                    color: themeObj.mainColors.secondary0,
                                    fontSize: 16,
                                }}>69 м2</Text>

                                <View style={{ flexGrow: 1 }}/>

                                <Text style={{ fontFamily: themeObj.font.font.w400, color: themeObj.mainColors.accent0, fontSize: 16, marginBottom: -2 }}>
                                    <Text style={{ fontFamily: themeObj.font.font.w700, fontSize: 20 }}>25 000</Text> ₽ / ночь
                                </Text>

                                <Space w={16}/>
                            </View></>
                            return [a,a,a,a]
                        }()
                    }



                    <Space h={bottomBarHeight} />
                </ScrollView>




                {/* Shadows */}
                <View style={[sg.absolute, {overflow: 'hidden'}]} pointerEvents='none'>
                    <View style={[sg.absolute, { top: -11, bottom: undefined, height: 1,
                        backgroundColor: 'white', // need to view show
                        elevation: 10
                    }]}/>
                    <View /*collapsable={false}*/ style={[sg.absolute, { top: -1, bottom: undefined, height: 1,
                        shadowOffset: { width: 0, height: 2},
                        shadowRadius: 3,
                        shadowColor: 'rgba(176, 176, 176, 0.25)'
                    }]}/>
                </View>

            </View>
        </BottomSheetBody>
    </BottomSheet>
}
export default AvailableApartments




