import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { setAppNavMapMode } from "@rx/appReducer";
import { StateType } from "@rx/store";
import {useSocket, useThemeNew} from "@h";
import {ThemeType} from "@t";
import SelectVariants from "@c/SelectVariants";
import {useVariants} from "@h/useVariants";
import {useBackHandler} from "@react-native-community/hooks";
import {inf, sg} from "@u2/utils";
import Checkbox from 'expo-checkbox';
import RangePicker from "@c/RangePicker";
import {NumFormat} from "@u2/NumFormat";
import {prettyPrint} from "@u";


const pad = 12


const f = new NumFormat().setFormat({
    intDelim: { delim: ' ', step: 3 },
    round: { mode: 'half-up', scale: 0 },
    suffix: ' ₽'
})


const makeStyle = (t: ThemeType) => StyleSheet.create({
    bottomSheet: {
        borderRadius: 30,
        backgroundColor: t.mainColors.bgc0
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: pad,
        paddingTop: 0,
        paddingBottom: 80
    },

    filterTitle: {
        fontFamily: t.font.familyBold,
        fontSize: 24,
        textAlign: 'center',
        color: t.mainColors.secondary1,
    },
    text: {
        height: 30,
        textAlignVertical: 'center',
        fontSize: 17,
        color: t.mainColors.secondary1,
        fontFamily: t.font.family,
    },


    variantsBoxNormal:{
        backgroundColor: 'transparent',
        borderColor: t.mainColors.secondary2,
    },
    variantsBoxSelected:{
        backgroundColor: t.mainColors.accent2,
        borderColor: t.mainColors.accent2,
    },
    variantsTextNormal:{
        color: t.mainColors.secondary1,
        fontFamily: t.font.family,
    },
    variantsTextSelected:{
        color: t.mainColors.secondary1
    },


    priceStyle: {
        height: 30,
        textAlignVertical: 'center',
        //backgroundColor: '#ff000033',
        fontSize: 20,
        color: t.mainColors.secondary1,
        fontFamily: t.font.familyBold,
    },

    priceBarNormal: {
        backgroundColor: 'transparent',
        borderColor: t.mainColors.accent2,
    },
    priceBarSelected: {
        backgroundColor: t.mainColors.accent2,
        borderColor: t.mainColors.accent2,
    },


    checkboxBox: {
        width: '100%', flexDirection:'row', paddingHorizontal: 10,
        paddingVertical: 10,
    },
    checkboxText: {
        flex:1, textAlignVertical:'center',
        fontFamily: t.font.familyBold,
        fontSize: 20,
        color: t.mainColors.secondary1,
    },
    checkbox: {
        margin: 8,
    },

    buttonBox: {
        ...sg.absolute, top:undefined, height:50,
        margin: pad,
    },
    applyBtn: {
        ...sg.centerContent,
        flex: 1,
        borderRadius: inf,
        backgroundColor: t.mainColors.accent0,
    },
    applyBtnText: {
        fontFamily: t.font.family,
        fontSize: 20,
        color: t.mainColors.onAccent0
    },
});


const typesMock = ['Квартира','Дом','Койко-место','Часть дома','Комната','Таунхаус']
const selectedTypesMock = ['Квартира','Комната']

const roomsMock = ['Студия','1','2','3','4','5']
const selectedRoomsMock = ['Студия']

const minPrice = 1000
const maxPrice = 60000
const selectedMin = 1000
const selectedMax = 10000

type FiltersProps = {}
const Filters = ({}:FiltersProps) => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const priceTextRef = useRef<TextInput>(null)

    const { style:s, themeObj } = useThemeNew(makeStyle)

    // variables
    const snapPoints = useMemo(() => ['25%','50%','75%'], []);

    const mapMode = useSelector((s:StateType)=>s.app.appNav.mapMode)
    const [index, setIndex] = useState(-1)
    useLayoutEffect(()=>{
        if (bottomSheetRef.current){
            if (mapMode==='filters' && index===-1) bottomSheetRef.current.snapToIndex(2)
            if (mapMode!=='filters' && index>=0) bottomSheetRef.current.close()
        }
    },[mapMode,bottomSheetRef])
    useLayoutEffect(()=>{
        if (bottomSheetRef.current){
            if (mapMode==='filters' && index===-1) onClose()
        }
    },[index,bottomSheetRef])

    const close = () => {
        if (bottomSheetRef.current) {
            if (mapMode==='filters' && index>=0){
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

    const onFilter = () => {
        close()
        alert(prettyPrint({
            "тип": selectedTypes,
            "Количество комнат": selectedRooms,
            "Можно с животными": isAnimalsChecked,
            "Можно с детьми": isChildrenChecked,
            "Цена": priceRange,
        },'str'))
    }

    const [types, selectedTypes, onTypeSelect] = useVariants(typesMock,selectedTypesMock)
    const [rooms, selectedRooms, onRoomSelect] = useVariants(roomsMock,selectedRoomsMock)


    const [isAnimalsChecked, setAnimalsChecked] = useState(false)
    const [isChildrenChecked, setChildrenChecked] = useState(false)

    const [priceRange, setPriceRange] = useState({min:selectedMin,max:selectedMax})




    const handleComponent = useCallback(()=>
        <View style={{
            height: 60,
            alignItems:'center', justifyContent:'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <View style={{
                backgroundColor: themeObj.mainColors.secondary0,
                width: 40, height: 4,
                borderRadius: inf
            }}/>
            <View style={{marginTop: 5}}/>
            <Text style={s.filterTitle}>Фильтр 🎉</Text>
        </View>, [themeObj])

    return <BottomSheet
        enableContentPanningGesture={false}
        handleComponent={handleComponent}
        ref={bottomSheetRef}
        backgroundStyle={s.bottomSheet}
        handleIndicatorStyle={{backgroundColor: themeObj.mainColors.secondary0}}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} >
            <View style={s.contentContainer}>

                {/*<Text style={s.filterTitle}>Фильтр 🎉</Text>*/}

                <BottomSheetScrollView style={{paddingHorizontal: pad}}>

                    <Text style={s.text}>Тип</Text>
                    <View style={{marginTop: 10}}/>
                    <View style={{width: '100%'}}>
                        <SelectVariants
                            variants={types}
                            selected={selectedTypes}
                            onSelect={onTypeSelect}
                            normalBox={s.variantsBoxNormal}
                            selectedBox={s.variantsBoxSelected}
                            normalTxt={s.variantsTextNormal}
                            selectedTxt={s.variantsTextSelected}
                        />
                    </View>


                    <View style={{marginTop: 15}}/>
                    <Text style={s.text}>Количество комнат</Text>
                    <View style={{marginTop: 10}}/>
                    <View style={{width: '100%'}}>
                        <SelectVariants
                            variants={rooms}
                            selected={selectedRooms}
                            onSelect={onRoomSelect}
                            normalBox={s.variantsBoxNormal}
                            selectedBox={s.variantsBoxSelected}
                            normalTxt={s.variantsTextNormal}
                            selectedTxt={s.variantsTextSelected}
                        />
                    </View>




                    <View style={{marginTop: 15}}/>

                    <Text style={s.text}>Цена</Text>

                    <TextInput ref={priceTextRef} editable={false} style={s.priceStyle}/>

                    <View style={{marginTop: 10}}/>

                    <View style={{width:'100%'}}>
                        <RangePicker
                            min={minPrice} max={maxPrice} s={priceRange.min} e={priceRange.max}
                            normalStyle={s.priceBarNormal} selectedStyle={s.priceBarSelected}
                            onChange={(s,e)=>{
                                if (priceTextRef.current)
                                    priceTextRef.current.setNativeProps({
                                        text: f.setValue(s).format()+' - '+f.setValue(e).format()
                                    })
                            }}
                            onEndChange={(s,e)=>{
                                setPriceRange({min:s,max:e})
                                if (priceTextRef.current)
                                    priceTextRef.current.setNativeProps({
                                        text: f.setValue(s).format()+' - '+f.setValue(e).format()
                                    })
                            }}
                        />
                    </View>





                    <View style={{marginTop: 15}}/>

                    <Pressable style={s.checkboxBox} onPress={()=>setAnimalsChecked(!isAnimalsChecked)}>
                        <Text style={s.checkboxText}>Можно с животными</Text>
                        <Checkbox
                            style={s.checkbox}
                            value={isAnimalsChecked}
                            onValueChange={setAnimalsChecked}
                            color={themeObj.mainColors.accent0}
                        />
                    </Pressable>

                    <View style={{marginTop: 5}}/>

                    <Pressable style={s.checkboxBox} onPress={()=>setChildrenChecked(!isChildrenChecked)}>
                        <Text style={s.checkboxText}>Можно с детьми</Text>
                        <Checkbox
                            style={s.checkbox}
                            value={isChildrenChecked}
                            onValueChange={setChildrenChecked}
                            color={themeObj.mainColors.accent0}
                        />
                    </Pressable>

                </BottomSheetScrollView>


                <View style={s.buttonBox}>
                    <Pressable style={s.applyBtn} onPress={onFilter}>
                        <Text style={s.applyBtnText}>Применить фильтр</Text>
                    </Pressable>
                </View>


            </View>
        </BottomSheet>
}
export default Filters