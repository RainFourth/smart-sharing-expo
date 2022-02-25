import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {ColorValue, Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import { emptyFun, inf } from "@u2/utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, runOnUI, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import {prettyPrint} from "@u";



export const inRange = (min:number, max:number, curr:number) => {
    'worklet';
    if (curr<min) return min
    if (curr>max) return max
    return curr
}




const normalDefault = {
    backgroundColor: 'transparent', //
    borderColor: '#E1E1E1', // <noname>
}
const selectedDefault = {
    backgroundColor: '#E6DEFF', // Purple
    borderColor: '#E6DEFF', // Purple
}





// todo авторасширение/сужение диапазона

const touchPadding = 7; // отступ касания в % с каждой стороны
const minBarW = 5; // минимальная ширина полоски %



type DoubleProgressIndicatorProps = {
    min?: number, max?: number
    s?: number, e?: number
    onChange?: (s: number, e: number) => void
    onEndChange?: (s: number, e: number) => void
    normalStyle?: { backgroundColor?: ColorValue, borderColor?: ColorValue }
    selectedStyle?: { backgroundColor?: ColorValue, borderColor?: ColorValue }
}
const RangePicker = ({
    min = 0, max = 100, s = 0, e = 50, onChange = emptyFun, onEndChange = emptyFun,
    normalStyle = normalDefault, selectedStyle = selectedDefault
}:DoubleProgressIndicatorProps) => {


    const v = useRef<View>(null)
    const [w,setW] = useState(undefined as undefined|number)

    //const needToUpdateState = useSharedValue(1)
    const needToUpdateText = useSharedValue(true)

    const offset = useSharedValue({s,e})
    const leftMode = useSharedValue(undefined as undefined|boolean)
    const barAnim = useAnimatedStyle(()=>{
        let s = (offset.value.s-min)/(max-min)*100
        let e = (offset.value.e-min)/(max-min)*100
        s = inRange(0,100,s)
        e = inRange(0,100,e)
        const l = leftMode.value ?? e>50
        if (l && e-s<minBarW) s = e-minBarW
        else if (!l && e-s<minBarW) e = s+minBarW
        return { left: s+'%', right: 100-e+'%' }
    })


    const onEnd = useCallback(async (s,e)=>onEndChange(s,e),[onEndChange])

    useLayoutEffect(()=>{
        if (v.current){
            v.current.measure((x,y,width)=>setW(width))
        }
    },[v.current])

    useLayoutEffect(()=>{
        let timerId = setInterval(()=>{

            const s = offset.value.s, e = offset.value.e

            if (needToUpdateText.value){
                needToUpdateText.value = false
                onChange(s,e)
            }

            /*if (needToUpdateState.value<0) needToUpdateState.value = 1
            if (needToUpdateState.value>0){
                onEndChange(s,e)
                needToUpdateState.value--
            }*/


        },250)

        return ()=>clearInterval(timerId)
    },[])




    const gesture = Gesture.Pan()
        .onTouchesDown((ev) => {
            'worklet';
            let x = ev.allTouches[0].x
            if (w) {
                const pad = w*touchPadding/100
                const ww = w - pad*2
                x = inRange(min,max,(x-pad)/ww*(max-min)+min)
                const s = offset.value.s, e = offset.value.e
                if (x<=(s+e)/2) {
                    leftMode.value = true
                    offset.value = {s: x, e}
                }
                else {
                    leftMode.value = false
                    offset.value = {s, e: x}
                }

                needToUpdateText.value = true
            }
        })
        .onTouchesMove((ev) => {
            'worklet';
            const l = leftMode.value
            let x = ev.allTouches[0].x
            if (w){
                const pad = w*touchPadding/100
                const ww = w - pad*2
                x = inRange(min,max,(x-pad)/ww*(max-min)+min)
                const s = offset.value.s, e = offset.value.e
                if (l && x<e) offset.value = {s: x, e}
                else if (!l && x>s) offset.value = {s, e: x}

                needToUpdateText.value = true
            }
        })
        /*.onEnd((ev) => {
            'worklet';
        })*/
        .onTouchesUp((ev)=>{
            'worklet';
            const l = leftMode.value
            let x = ev.allTouches[0].x
            if (w){
                const pad = w*touchPadding/100
                const ww = w - pad*2
                x = inRange(min,max,(x-pad)/ww*(max-min)+min)
                const s = offset.value.s, e = offset.value.e
                if (l && x<e) offset.value = {s: x, e}
                else if (!l && x>s) offset.value = {s, e: x}

                needToUpdateText.value = true


                runOnJS(onEnd)(s,e)

            }
            //leftMode.value = undefined
        })


    return <View style={{width: '100%'}}>
        <GestureDetector gesture={gesture}><View ref={v} style={{
            flex: 1, borderRadius: inf, borderWidth: 1, overflow: 'hidden', height: 35,
            backgroundColor: normalStyle.backgroundColor, borderColor: normalStyle.borderColor,
        }}>

            <Animated.View style={[{
                position: 'absolute', top:0, bottom:0,
                borderWidth: 1,
                backgroundColor: selectedStyle.backgroundColor, borderColor: selectedStyle.borderColor
            }, barAnim]}/>

        </View></GestureDetector>
    </View>

}
export default RangePicker