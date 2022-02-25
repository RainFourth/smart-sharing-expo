import React, {useMemo} from 'react'
import {emptyFun, inf, sg} from "@u2/utils";
import {StyleSheet, View, Text, Pressable, ColorValue, TextStyle} from "react-native";


const normalBoxDefault = {
    backgroundColor: 'transparent', //
    borderColor: '#E1E1E1', // <noname>
}
const normalTxtDefault = {
    color: '#5C5C5C', // gray dark
}

const selectedBoxDefault = {
    backgroundColor: '#E6DEFF', // Purple
    borderColor: '#E6DEFF', // Purple
}
const selectedTxtDefault = {
    color: '#5C5C5C', // gray dark
}

const space = 14


// todo взаимоисключающие варианты (один вариант становится выбранным, но не активным при выборе другого)


type SelectVariantsProps<V> = {
    variants: readonly V[]
    selected?: V[]
    onSelect?: (v:V)=>void
    normalBox?: { backgroundColor?: ColorValue, borderColor?: ColorValue }
    normalTxt?: { color?: ColorValue, fontFamily?: string }
    selectedBox?: { backgroundColor?: ColorValue, borderColor?: ColorValue }
    selectedTxt?: { color?: ColorValue, fontFamily?: string }
}
const SelectVariants = <V extends any>({
    variants, selected = [], onSelect = emptyFun,
    normalBox = normalBoxDefault, normalTxt = normalTxtDefault,
    selectedBox = selectedBoxDefault, selectedTxt = selectedTxtDefault
}:SelectVariantsProps<V>) => {

    const s = useMemo(()=>StyleSheet.create({
        externalBox: {
            //width: '100%',
        },
        box: {
            //position: 'absolute', top:0, right:-space, bottom:-space, left:0,
            marginRight: -space, marginBottom: -space,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
        variant: {
            backgroundColor: normalBox.backgroundColor,
            borderColor: normalBox.borderColor,
            borderRadius: inf,
            borderWidth: 1,
            height: 38,
            paddingHorizontal: 18,
            marginRight: space, marginBottom: space,
            minWidth: 50
        },
        variantSelected: {
            backgroundColor: selectedBox.backgroundColor,
            borderColor: selectedBox.borderColor,
        },
        text: {
            flex: 1,
            fontSize: 17,
            textAlignVertical: 'center',
            textAlign: 'center',
            color: normalTxt.color,
            fontFamily: normalTxt.fontFamily
        },
        textSelected: {
            color: selectedTxt.color,
            fontFamily: selectedTxt.fontFamily??normalTxt.fontFamily
        },
    }),[normalBox,selectedBox,normalTxt,selectedTxt])


    return <View style={s.externalBox}>
        <View style={s.box}>
            {
                variants.map((v,i) => {
                    const sel = selected.includes(v)
                    return <Pressable style={[s.variant, sel?s.variantSelected:{}]} onPress={()=>onSelect(v)} key={i}>
                        <Text style={{...s.text, ...(sel?s.textSelected:{})}}>{v+""}</Text>
                    </Pressable>
                })
            }
        </View>
    </View>
}
export default SelectVariants