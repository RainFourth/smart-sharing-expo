import {ColorValue, View} from "react-native";
import {inf} from "@u2/utils";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import React, {useEffect, useLayoutEffect} from "react";

type CircleBgcAnimProps = {
    color?: ColorValue
    mode?: 'start'|'end'
}
const CircleBgcAnim = ({
    color = '#E6DEFF',
    mode = undefined
}:CircleBgcAnimProps) => {

    useEffect(()=>{
        switch (mode){
            case 'start': onStart(); break
            case 'end': onEnd(); break
        }
    },[mode])

    const offset = useSharedValue(50)
    const onPressAnim = useAnimatedStyle(()=>{
        const val = offset.value
        return { top: val+'%', right: val+'%', bottom: val+'%', left: val+'%' }
    })
    const onStart = () => {
        offset.value = withTiming(0, {
            duration: 200,
            easing: Easing.out(Easing.linear)
        })
    }
    const onEnd = () => {
        offset.value = withSequence(
            withTiming(0, {
                duration: 200,
                easing: Easing.out(Easing.linear)
            }),
            withTiming(0, {
                duration: 100
            }),
            withTiming(50, {
                duration: 200,
                easing: Easing.out(Easing.linear)
            })
        )
    }

    return <Animated.View style={[{
        position: 'absolute', borderRadius: inf,
        top: '50%', right: '50%', bottom: '50%', left: '50%',
        backgroundColor: color
    }, onPressAnim]}/>
}
export default CircleBgcAnim