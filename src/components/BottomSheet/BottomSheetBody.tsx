import React from "react";
import {LayoutChangeEvent, View} from "react-native";
import {BottomSheetHeaderInnerProps} from "@c/BottomSheet/BottomSheetHeader";




export type BottomSheetBodyInnerProps = {
    innerProps: undefined | {
        setBodyH: undefined|((h: number)=>void)
    }
}
export type BottomSheetBodyProps = {
    children?: React.ReactNode
}
const BottomSheetBody = ({ children, ...restProps }:BottomSheetBodyProps) => {
    const { innerProps } = restProps as BottomSheetBodyInnerProps

    const onBodyLayout = ({nativeEvent: {layout: { x, y, width:w, height:h }}}: LayoutChangeEvent) => {
        if (innerProps && innerProps.setBodyH) innerProps.setBodyH(h)
    }

    return <View style={{flex:1}} onLayout={onBodyLayout}>
        {children}
    </View>
}
export default BottomSheetBody