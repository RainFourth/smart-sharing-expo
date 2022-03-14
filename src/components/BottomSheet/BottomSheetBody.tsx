import React, {useState} from "react";
import {LayoutChangeEvent, View} from "react-native";




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

    const [measured, setMeasured] = useState(false)
    const onBodyLayout = ({nativeEvent: {layout: { x, y, width:w, height:h }}}: LayoutChangeEvent) => {
        if (!measured && innerProps && innerProps.setBodyH) {
            innerProps.setBodyH(h)
            setMeasured(true)
        }
    }

    return <View style={{flex:1}} onLayout={onBodyLayout}>
        {children}
    </View>
}
export default BottomSheetBody