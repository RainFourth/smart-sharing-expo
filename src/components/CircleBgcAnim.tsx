import {ColorValue, Pressable, View} from "react-native";
import {inf} from "@u2/utils";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
    cond,
    eq, runOnJS
} from "react-native-reanimated";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {sg} from "@u2/styleGlobal";



/*
    withSequence не поддерживает 0 или 1 аргумент, нужно 2+
    withSequence не поддерживает просто значения, нужна анимация withTiming, withDelay....


    Такое работает последовательно и нормально:
    offset.value = 50
    offset.value = withTiming(0, {
        duration: 2000,
        easing: Easing.out(Easing.linear)
    })
 */




//let cnt = 0


type CircleBgcAnimProps = {
    color?: ColorValue
    mode?: 'start'|'end'
}
const CircleBgcAnim = React.memo(({
    color = '#E6DEFF',
    mode = undefined
}:CircleBgcAnimProps) => {

    //console.log('rerender: ',cnt++)

    useEffect(()=>{
        switch (mode){
            case 'start': onStart(); break
            case 'end': onEnd(); break
        }
    },[mode])


    const [firstFinished, setFirstFinished] = useState(false)
    const [needEnd, setNeedEnd] = useState(false)

    useEffect(()=>{
        if (firstFinished && needEnd){
            opacity.value = withDelay(100, withTiming(0, {
                    duration: 500,
                    easing: Easing.out(Easing.linear)
                })
            )
        }
    },[firstFinished,needEnd])


    const offset = useSharedValue(50)
    const opacity = useSharedValue(1)
    const onPressAnim = useAnimatedStyle(()=>{
        const off = offset.value
        const op = opacity.value
        return {
            top: off+'%', right: off+'%', bottom: off+'%', left: off+'%',
            opacity: op
        }
    })

    const onStart = () => {
        setFirstFinished(false)
        setNeedEnd(false)

        offset.value = withTiming(50, {duration:1},
            ()=>opacity.value = withTiming(1, {duration:1},
                ()=>offset.value = withTiming(0, {
                        duration: 200,
                        easing: Easing.out(Easing.linear)
                    }, ()=>runOnJS(setFirstFinished)(true)
                )
            )
        )
    }
    const onEnd = () => {
        setNeedEnd(true)
    }

    return<Animated.View style={[{
        position: 'absolute', borderRadius: inf,
        top: '50%', right: '50%', bottom: '50%', left: '50%',
        opacity: 1,
        backgroundColor: color
    }, onPressAnim]} />
})
export default CircleBgcAnim