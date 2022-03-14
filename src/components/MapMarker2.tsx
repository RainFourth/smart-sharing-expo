import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useThemeNew} from '@h';
import {NumFormat} from "@rrainpath/num-format";
import {sg} from "@u2/styleGlobal";
import {ThemeType} from "@t";
import {empty, inf} from "@u2/utils";

const makeStyles = (t: ThemeType, selected: 'all' | 'some' | 'none') => StyleSheet.create({
    priceView: {
        paddingHorizontal: 10, paddingVertical: 5,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: selected==='all' ? t.mainColors.accent2 :
            selected==='some' ? t.mainColors.accent1 : t.mainColors.bgc0,


        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5

    },
    priceText: {
        fontFamily: t.font.font.w600,
        color: selected==='all' || selected==='some' ? t.mainColors.onAccent0 : t.mainColors.secondary0,
        fontSize: 12
    },
    circleView: {
        height: 10, width: 10,
        backgroundColor: t.mainColors.accent2,
        borderRadius: inf,

        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5

    },
    shadowView: {

        height: 2,
        width: 2,
        borderRadius: 2,
        transform: [
            { scaleX: 4 }
        ],
        backgroundColor: t.marker.shadowCircleColor,
        opacity: 0.25

    }
})


const f = new NumFormat().setFormat({
    intDelim: { delim: ' ', step: 3 },
    round: { mode: 'half-up', scale: 0 },
    suffix: ' ₽'
})


type MapMarkerProps = {
    price: number|empty
    count: number
    selected?: 'all' | 'some' | 'none'
    exact?: boolean
}
function MapMarker(
    { price = undefined, count = 1, selected = 'none', exact = true }: MapMarkerProps
) {
    const { style: s, themeObj } = useThemeNew(theme => makeStyles(theme, selected), [selected])
    //console.log(s.priceText)
    const priceF = price ? f.setValue(price).format() : undefined


    return <View style={sg.centerContent}>
        {/*
               Костыль чтобы цвет обновлялся,
               потому что если выбрать один из двух маркеров,
               а потом отдалить карту чтобы они слились в один,
               а потом этот один выбрать полностью, то без этого костыля цвет не меняется
         */}
        { selected==='all' && <View></View> }

            <View style={[s.priceView, {backgroundColor: selected==='all' ? themeObj.mainColors.accent2 :
                    selected==='some' ? themeObj.mainColors.accent1 : themeObj.mainColors.bgc0}]}>
                <Text style={s.priceText}>
                    {`${count===1 ? '' : '×'+count+' от'} ${price ? priceF : '??? ₽'}`}
                </Text>
            </View>
            {
                exact && <>
                    <View style={s.circleView}/>
                    <View style={s.shadowView}/>
                </>
            }

        </View>
}

export default MapMarker