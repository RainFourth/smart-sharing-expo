import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image, Pressable} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppNavMapMode } from "@rx/appReducer";
import { StateT } from "@rx/store";
import {useThemeNew} from "@h";
import {ThemeType} from "@t";
import SelectVariants from "@c/SelectVariants";
import {useBackHandler} from "@react-native-community/hooks";
import BottomSheet, {BottomSheetSettings} from '~/components/BottomSheet/BottomSheet';
import BottomSheetHeader from "@c/BottomSheet/BottomSheetHeader";
import BottomSheetBody from "@c/BottomSheet/BottomSheetBody";
import {inf, isEmpty, nonEmpty} from "@u2/utils";
import Space from "@c/Space";
import {sg} from "@u2/styleGlobal";
import HeartEmptyIc from "@c/SvgIcons/HeartEmptyIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import RoomIc from "@c/SvgIcons/RoomIc";
import AreaIc from "@c/SvgIcons/AreaIc";
import {Apartment, FavoriteList, Imagee, updateFavoriteApartment} from "@se/apartmentsService2";
import {API_URL} from "@env";
import {PlaceSubType} from "@r/apartmentsRepoMock";
import {NumFormat} from "@rrainpath/num-format";
import HeartIc from "@c/SvgIcons/HeartIc";
import {setApartmentsInCity} from "@rx/apartmentsReducer";
import {userService} from "@se/userService2";
import {useFirstAndLastAction} from "@h/useFirstAndLastAction";

const testAp1 = require('@im/test-apartments-photo-1.jpg')
const testAp2 = require('@im/test-apartments-photo-2.jpg')
const defaultAp = require('@im/default-apartment.png')

const f = new NumFormat().setFormat({
    intDelim: { delim: ' ', step: 3 },
    round: { mode: 'half-up', scale: 0 },
})

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
    const { mapMode, bottomBarHeight } = useSelector((s:StateT)=>s.app.appNav)
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
        city, apartments: { data: aps, error: apsE },
        groupedApartments, addressFilter, selectedApartmentIds
    } = useSelector((s:StateT)=>s.apartments.selectedCity)

    const [selectedApartments, setSelectedApartments] = useState([] as Apartment[])
    useEffect(()=>{
        const selApIds = selectedApartmentIds.idsSet
        if (aps){
            if (selApIds.size>0) setSelectedApartments(aps.filter(ap=>selApIds.has(ap.id!)))
            else setSelectedApartments(aps)
        }
    },[aps, selectedApartmentIds])

    /*useEffect(()=>{
        console.log('selected ids:', selectedApartmentIds.idsSet)
    },[selectedApartmentIds])*/

    /*const onLike = (ap: Apartment) => {
        d(setApartmentsInCity({
            data: aps?.map(it=>{
                if (it===ap && nonEmpty(it.isFavorite)) {
                    const newAp = it.clone()
                    newAp.isFavorite = !newAp.isFavorite
                    return newAp
                }
                else return it
            }),
            error: apsE
        }))
    }*/

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
                    <Text style={s.headerTitle}>{selectedApartments.length+' вариантов'}</Text>
                </View>
            </View>
        </BottomSheetHeader>
        <BottomSheetBody>
            <View style={s.contentBox}>

                <ScrollView keyboardShouldPersistTaps='always'>

                    { mapMode==='apartmentsFull' && <Space h={100}/> }

                    { selectedApartments.map(ap=><ApInfo apartment={ap}/>) }




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



function ApInfo({apartment}: {apartment: Apartment}){
    const { style:s, themeObj, theme, setTheme } = useThemeNew(makeStyle)
    const d = useDispatch()
    const ap = apartment

    const [favList,setFavList] = useFirstAndLastAction(
        [...ap.favoriteLists],
        async data => {
            const { data:d } = await updateFavoriteApartment(
                ap.id!, data!.map(it=>it.id!)
            )
            return !!d?.success
        }
    )

    const isFavorite = favList.length>0
    const { user } = useSelector(((s:StateT)=>s.user))



    const onLike = () => {
        if (favList.length===0){
            setFavList([user!.favoriteLists!.find(it=>it.name===null)!])
        } else if (favList.length===1 && favList[0].name===null){
            setFavList([])
        } else {

        }
    }


    const onLongLike = async () => {

    }



    return <>
        <Space h={40}/>

        <ScrollView horizontal keyboardShouldPersistTaps='always'>
            <Space w={8}/>

            { function (){
                let imgs = ap.images.length>0
                    ? ap.images.map(it=>API_URL+'/image?path='+it.path)
                    : [defaultAp]
                return imgs?.map(img=>{
                    return <View style={{marginHorizontal: 8}}>
                        <Image style={{borderRadius: 10, width: 340, height: 180}} source={ typeof img === 'string' ? { uri:img } : img } />
                        <Pressable onPress={onLike} onLongPress={onLongLike}
                                   style={[sg.center, {position: 'absolute', top: 12, right: 10, width: 30, height: 30}]}>
                            { isFavorite
                                ? <HeartIc color={'black'} size={25}/>
                                : <HeartEmptyIc color={'black'} size={32}/>
                            }
                        </Pressable>
                    </View>
                })
            }() }

            <Space w={8}/>
        </ScrollView>

        <DotsBar cnt={4} selected={undefined} />

        <Space h={4}/>

        <View style={[sg.row]}>
            <Space w={16}/>
            <LocationIc color={themeObj.mainColors.secondary0} size={18} />
            <Space w={8}/>
            <Text style={{
                fontFamily: themeObj.font.font.w400,
                color: themeObj.mainColors.secondary0,
                fontSize: 16,
            }}>{`${ap.house?.street?.city?.name}, ${placeSubTypeToShort(ap.house?.street?.placeSubType)}. ${ap.house?.street?.name} ${ap.house?.name}`}</Text>
        </View>

        <Space h={4}/>

        <View style={[sg.row, { alignItems: 'flex-end' }]}>
            <Space w={16}/>
            <RoomIc color={themeObj.mainColors.secondary0} size={18} />
            <Space w={8}/>
            <Text style={{
                fontFamily: themeObj.font.font.w400,
                color: themeObj.mainColors.secondary0,
                fontSize: 16,
            }}>{ap.rooms==='Студия' ? ap.rooms : ap.rooms+'-ком'}</Text>

            <Space w={16}/>
            <AreaIc color={themeObj.mainColors.secondary0} size={18} />
            <Space w={8}/>
            <Text style={{
                fontFamily: themeObj.font.font.w400,
                color: themeObj.mainColors.secondary0,
                fontSize: 16,
            }}>{ap.area} м2</Text>

            <View style={{ flexGrow: 1 }}/>

            <Text style={{ fontFamily: themeObj.font.font.w400, color: themeObj.mainColors.accent0, fontSize: 16, marginBottom: -2 }}>
                <Text style={{ fontFamily: themeObj.font.font.w700, fontSize: 20 }}>{isEmpty(ap.price) ? '???' : f.setValue(+ap.price).format()}</Text> ₽ / ночь
            </Text>

            <Space w={16}/>
        </View>
    </>

}


function DotsBar({ cnt, selected }: { cnt: number, selected: number|undefined }){
    const { themeObj } = useThemeNew()

    return <View style={[sg.row, sg.center, { width: '100%', height: 21 }]}>
        { function (){
            const dots = [] as JSX.Element[]
            for (let i = 0; i < cnt; i++) {
                dots.push(
                    <View key={i} style={{
                        width: 7, height: 7, marginHorizontal: 7, borderRadius: inf,
                        backgroundColor: i===selected ? themeObj.mainColors.accent0 : themeObj.mainColors.accent3
                    }}/>
                )
            }
            return dots
        }() }
    </View>
}






function placeSubTypeToShort(placeSubType?: PlaceSubType){
    switch (placeSubType){
        case "улица": return 'ул'
        case "микрорайон": return 'мкр'
        case "переулок": return 'пер'
        default: return placeSubType
    }
}


