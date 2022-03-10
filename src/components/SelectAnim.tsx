import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {ColorValue} from "react-native";
import {sg} from "@u2/styleGlobal";
import {useEffect} from "react";



type SelectAnimProps = {
    color?: ColorValue
    mode?: 'start'|'end'
}
const SelectAnim = ({
    color = '#f0f0f0',
    mode = undefined
}:SelectAnimProps) => {

    console.log(mode)

    useEffect(()=>{
        switch (mode){
            case 'start': onStart(); break
            case 'end': onEnd(); break
        }
    },[mode])

    const opacity = useSharedValue(0)
    const animStyle = useAnimatedStyle(()=>{

        return {
            opacity: opacity.value
        }
    })

    const onStart = () => {
        opacity.value = withTiming(1, {duration:1500})
    }
    const onEnd = () => {
        opacity.value = withTiming(0, {duration:500})
    }

    return <Animated.View style={[sg.absolute, {backgroundColor: color}, animStyle]}>

    </Animated.View>
}
export default SelectAnim