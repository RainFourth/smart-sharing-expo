import React, {useState} from "react";
import {LayoutChangeEvent, StyleSheet, Text, View} from "react-native";
import {inf} from "@u2/utils";
import {sg} from "@u2/styleGlobal";
import Space from "@c/Space";
import {fonts2} from "@t/fonts";




const s = StyleSheet.create({
    headerFrame: {
        width: '100%',
        backgroundColor: 'transparent',
    }
})




export type BottomSheetHeaderInnerProps = {
    innerProps: undefined | {
        setHeaderH: undefined|((h: number)=>void)
    }
}
export type BottomSheetHeaderProps = {
    children?: React.ReactNode
}
const BottomSheetHeader = ({ children, ...restProps }:BottomSheetHeaderProps) => {
    const { innerProps } = restProps as BottomSheetHeaderInnerProps

    const [measured, setMeasured] = useState(false)
    const onHeaderLayout = ({nativeEvent: {layout: { x, y, width:w, height:h }}}: LayoutChangeEvent) => {
        if (!measured && innerProps && innerProps.setHeaderH) {
            innerProps.setHeaderH(h)
            setMeasured(true)
        }
    }

    return <View style={s.headerFrame} onLayout={onHeaderLayout}>
        {children}
    </View>
}
export default BottomSheetHeader


