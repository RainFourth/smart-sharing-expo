import Header, {
    BottomSheetHeaderInnerProps,
    BottomSheetHeaderProps
} from "@c/BottomSheet/BottomSheetHeader";
import Body, {BottomSheetBodyInnerProps, BottomSheetBodyProps} from "@c/BottomSheet/BottomSheetBody";
import React, {useCallback, useLayoutEffect, useMemo, useState} from "react";
import {ColorValue, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {sg} from "@u2/styleGlobal";
import {defaultComparator, empty, emptyFun, extractPercent, inf, inRange, nonEmpty} from "@u2/utils";
import BottomSheetHeader from "@c/BottomSheet/BottomSheetHeader";
import BottomSheetBody from "@c/BottomSheet/BottomSheetBody";

type HeaderElem = React.ReactElement<BottomSheetHeaderProps, typeof Header>
type BodyElem = React.ReactElement<BottomSheetBodyProps, typeof Body>



const defaultVelocity = 100

const s = StyleSheet.create({
    frame: {
        position: 'absolute', left: 0, bottom: 0, right: 0,
    },
    bodyFrame: {
        width: '100%',
    },
})

// todo make min/max body height
//const maxBodyHeight = '80%' as number|string


// You can drag this bottom sheet only by header


// todo property
//  allowContentUnderScreen - change height or bottom prop when sheet is not full height
//  UPDATE - no need - just set body height fixed

// todo headerHeight & bodyHeight as snap point 'headerH' & 'bodyH' & '-headerH' & '-bodyH'- simple replace this words with numbers

// todo default components with hints what to do

// To dynamically manipulate Bottom Sheet use newSettings,
// they are applied if settings object was changed and apply only non-undefined values


export type BottomSheetSettings = empty | {
    close?: boolean
    index?: number
}

type BottomSheetProps = {
    snapPoints: (number|string)[]
    initialSettings: BottomSheetSettings
    bodyBgcColor?: ColorValue
    newSettings?: BottomSheetSettings
    enableCloseOnZeroSnap?: boolean
    onChange?: (closed: boolean, snapIdx: number|undefined)=>void
    children?: (HeaderElem | BodyElem)[] | HeaderElem | BodyElem | undefined
}
const BottomSheet = ({
    snapPoints, initialSettings, bodyBgcColor = 'white', newSettings, enableCloseOnZeroSnap = true,
    onChange = emptyFun, children
}:BottomSheetProps) => {

    const [mainFrameH, setMainFrameH] = useState(0)
    const [headerH, setHeaderH] = useState(0)
    const [bodyH, setBodyH] = useState(0)
    const prevH = useSharedValue(0)
    const currH = useSharedValue(0)
    const [closed, setClosed] = useState(true)
    const [bgcColor, setBgcColor] = useState(bodyBgcColor)


    const [header, setHeader] = useState(undefined as undefined|HeaderElem)
    const [body, setBody] = useState(undefined as undefined|BodyElem)
    useLayoutEffect(()=>{
        let newHeader = defaultHeader
        if (children) {
            if (children instanceof Array) {
                if(children[0] && (children[0] as any).type?.prototype === BottomSheetHeader.prototype)
                    newHeader = children[0]
            } else if ((children as any).type?.prototype === BottomSheetHeader.prototype)
                newHeader = children
        }

        const innerProps = {
            innerProps: { setHeaderH }
        } as BottomSheetHeaderInnerProps
        newHeader = React.cloneElement(newHeader, {
            ...newHeader.props,
            ...innerProps
        })
        setHeader(newHeader)
    },[children])
    useLayoutEffect(()=>{
        let newBody = defaultBody
        if (children) {
            if (children instanceof Array) {
                if(children[1] && (children[1] as any).type?.prototype === BottomSheetBody.prototype)
                    newBody = children[1]
                else if (children[0] && (children[0] as any).type?.prototype === BottomSheetBody.prototype)
                    newBody = children[0]
            } else if ((children as any).type?.prototype === BottomSheetBody.prototype)
                newBody = children
        }

        const innerProps = {
            innerProps: { setBodyH }
        } as BottomSheetBodyInnerProps
        newBody = React.cloneElement(newBody, {
            ...newBody.props,
            ...innerProps
        })
        setBody(newBody)
    },[children])




    const [readySnapPoints, setReadySnapPoints] = useState(undefined as undefined|number[])
    const [readySnapThresholds, setReadySnapThresholds] = useState(undefined as undefined|number[])
    useLayoutEffect(()=>{
        if (mainFrameH){
            const newPoints = snapPoints.map(p => {
                if (typeof p === 'number') {}
                else if (typeof p === 'string'){
                    let pp = extractPercent(p)
                    if (pp) p = pp*mainFrameH/100
                    else p = 0
                }
                else p = 0
                return p
            })
            newPoints.sort(defaultComparator)

            const thresholds: number[] = []
            for (let i = 1; i < newPoints.length; i++) {
                thresholds.push((newPoints[i-1]+newPoints[i])/2)
            }

            setReadySnapThresholds(thresholds)
            setReadySnapPoints(newPoints)
        }
    },[snapPoints, mainFrameH])


    const onActionEnd = useCallback((closed: boolean, snapIdx: number|undefined) => {
        if (closed) setClosed(true)
        onChange(closed, snapIdx)
    },[setClosed, onChange])

    const close = useCallback((withIndex: undefined|0)=>{
        if (!closed){
            const depth = headerH ?? 0
            currH.value = withSpring(
                -depth,
                getSpringConfig(-defaultVelocity),
                ()=>runOnJS(onActionEnd)(true, withIndex)
            )
        }
    },[closed, headerH, onActionEnd])

    const snapToIndex = useCallback((idx: number|empty)=>{
        if (enableCloseOnZeroSnap && idx===0){
            close(0)
        } else if (readySnapPoints && nonEmpty(idx)){
            setClosed(false)
            const i = inRange(0, readySnapPoints.length-1, idx)
            currH.value = withSpring(
                readySnapPoints[i],
                getSpringConfig(defaultVelocity),
                ()=>runOnJS(onActionEnd)(false, idx)
            )
        }
    },[close, readySnapPoints, enableCloseOnZeroSnap])

    const [initialized, setInitialized] = useState(false)
    useLayoutEffect(()=>{
        if (!initialized && readySnapPoints && initialSettings){
            if (initialSettings.close) close(undefined)
            else snapToIndex(initialSettings.index)
            setInitialized(true)
        }
    },[readySnapPoints, initialSettings, initialized])


    const onSettings = useCallback((newSettings: BottomSheetSettings)=>{
        const s = newSettings
        if (s){
            if (s.close){
                close(undefined)
            } else if (nonEmpty(s.index)){
                //console.log('snapToIndex:',s.index)
                snapToIndex(s.index)
            }
        }
    },[newSettings, close, snapToIndex])
    useLayoutEffect(() => {
        if (newSettings) onSettings(newSettings)
    },[newSettings])




    const animatedFrameStyle = useAnimatedStyle(()=>{
        const h = currH.value
        return { bottom: h>=0 ? 0 : h}
    })
    const animatedBodyStyle = useAnimatedStyle(()=>{
        return { height: inRangeW(0, mainFrameH ?? 0, currH.value) }
    })




    const findSnapIdx = useCallback((h: number) => {
        'worklet';
        if (readySnapPoints && readySnapThresholds){
            for (let i = 0; ; i++) {
                if (i === readySnapThresholds.length){
                    return readySnapPoints.length-1
                }
                if (h<=readySnapThresholds[i]) {
                    return i
                }
            }
        }
        return 0
    },[readySnapThresholds,readySnapPoints])

    const gesture = useMemo(()=>Gesture.Pan()
        .onBegin(ev => prevH.value = currH.value)
        .onUpdate(ev => currH.value = prevH.value-ev.translationY)
        //.onEnd(ev=>console.log('onEnd: ',ev))
        .onFinalize(ev=>{
            if (readySnapPoints){
                const idx = findSnapIdx(prevH.value-ev.translationY)
                if (idx===0 && enableCloseOnZeroSnap){
                    const depth = headerH ?? 0
                    currH.value = withSpring(
                        -depth,
                        getSpringConfig(-ev.velocityY),
                        ()=>runOnJS(onActionEnd)(true, 0)
                    )
                } else {
                    currH.value = withSpring(
                        readySnapPoints[idx],
                        getSpringConfig(-ev.velocityY),
                        ()=>runOnJS(onActionEnd)(false, idx)
                    )
                }
            }
        })
    ,[findSnapIdx, readySnapPoints, enableCloseOnZeroSnap, headerH, onActionEnd])





    const onMainFrameLayout = ({nativeEvent: {layout: { x, y, width:w, height:h }}}: LayoutChangeEvent) => {
        setMainFrameH(h)
        //console.log('onMainFrameLayout: ',x,y,w,h)
        // => onLayout:  0 316.4705810546875 423.5294189453125 436.4706115722656
    }




    return <View style={[sg.absolute, /*{backgroundColor: '#ff000033'}*/]}
         onLayout={onMainFrameLayout}
         pointerEvents='box-none'
    >
        {
            !closed && <Animated.View style={[s.frame, animatedFrameStyle]} >

                <GestureDetector gesture={gesture}>
                    {header}
                </GestureDetector>


                <Animated.View style={[s.bodyFrame, animatedBodyStyle, {
                    backgroundColor: bgcColor
                }]}>
                    {body}
                </Animated.View>

            </Animated.View>
        }
    </View>
}
export default BottomSheet



const getSpringConfig = (velocity: number) => {
    'worklet';
    return {
        damping: undefined,
        mass: 1,
        stiffness: 1000,
        overshootClamping: false,
        restSpeedThreshold: 10,
        restDisplacementThreshold: 10,
        velocity: velocity,
    }
}


const defaultS = StyleSheet.create({
    headerBox: {
        height: 60, width: '100%',
        flexDirection: 'column',
        alignItems:'center',
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        backgroundColor: 'white',
    },
    dash: {
        position: 'absolute', top: 8, marginHorizontal: 'auto',
        width: 40, height: 4,
        borderRadius: inf,
        backgroundColor: 'black',
    },
    headerTitle: {
        fontSize: 24,
        color: 'black',
    },

    list: {
        flex: 1
    }
})
const defaultHeader = <BottomSheetHeader>
    <View style={defaultS.headerBox}>
        <View style={defaultS.dash}/>
        <View style={[sg.absolute, sg.centerContent]}></View>
    </View>
</BottomSheetHeader>
const defaultBody = <BottomSheetBody>
    <ScrollView style={defaultS.list} keyboardShouldPersistTaps='always'></ScrollView>
</BottomSheetBody>



const inRangeW = (min:number, max:number, curr:number) => {
    'worklet';
    if (curr<min) return min
    if (curr>max) return max
    return curr
}


const throwChildrenError = () => {
    throw new Error('Error! BottomSheet children must be: ' +
        'BottomSheetHeader | BottomSheetBody | [BottomSheetHeader,BottomSheetBody] | [] | undefined')
}




/*const snap = useCallback((h: number) => {
    'worklet';
    if (readySnapPoints && readySnapThresholds){
        for (let i = 0; ; i++) {
            if (i === readySnapThresholds.length){
                h = readySnapPoints[readySnapPoints.length-1]
                break
            }
            if (h<=readySnapThresholds[i]) {
                h = readySnapPoints[i]
                break
            }
        }
    }
    return h
},[readySnapThresholds,readySnapPoints])*/


/*useLayoutEffect(()=>{
    if (frame){
        // if View doesn't show anything, then it needs collapsable={false}
        // otherwise measure() returns undefined into callback because View isn't shown
        frame.measure((x,y,w,h,pX,pY)=>
            console.log('measure: ',x,y,w,h,pX,pY)

        )
        //cur.measureLayout(data=>console.log(data))
        frame.measureInWindow((x,y,w,h)=>
            console.log('measureInWindow: ',x,y,w,h)
        )
    }
},[frame])*/


/*if (children){
    if (children instanceof Array) {
        if (children.length===0){}
        else if (children.length===2
            && (children[0] as any).type?.prototype === BottomSheetHeader.prototype
            && (children[1] as any).type?.prototype === BottomSheetBody.prototype
        ) {
            header = children[0]
            body = children[1]
        } else throwChildrenError()
    } else if ((children as any).type?.prototype === BottomSheetHeader.prototype){
        header = children
    } else if ((children as any).type?.prototype === BottomSheetBody.prototype){
        body = children
    } else throwChildrenError()
}*/

/*if (children){
    if (children[0]){
        let ch0 = children[0]
        let isComponent: boolean = typeof ch0.type !== 'string'
            && React.Component.prototype.isPrototypeOf((ch0.type as any).prototype);

        //let result: boolean = isComponent ? (ch0.type as any).prototype instanceof ComponentBase
        //    : false; // Not a component, then never a ComponentBase



        let prot = (ch0.type as any).prototype

        console.log('--------------------')
        console.log(BottomSheetHeader.prototype)

        console.log(Object.getPrototypeOf(ch0))
        console.log(ch0)
        //console.log(JSON.stringify(ch0, ))
        console.log(ch0.type)
        console.log(isComponent)
        console.log(prot)
    }
}*/



/*
        onBegin:  Object {
          "absoluteX": 88.15367126464844,
          "absoluteY": 338.64715576171875,
          "eventName": "77onGestureHandlerStateChange",
          "handlerTag": 2,
          "numberOfPointers": 1,
          "oldState": 0,
          "state": 2,
          "translationX": 0,
          "translationY": 0,
          "velocityX": 0,
          "velocityY": 0,
          "x": 88.15367126464844,
          "y": 22.17656135559082,
        }
        onUpdate:  Object {
          "absoluteX": 88.15367126464844,
          "absoluteY": 347.07415771484375,
          "eventName": "77onGestureHandlerEvent",
          "handlerTag": 2,
          "numberOfPointers": 1,
          "state": 4,
          "translationX": 0,
          "translationY": 0,
          "velocityX": -0.0033353930339217186,
          "velocityY": 82.57898712158203,
          "x": 88.15367126464844,
          "y": 30.603553771972656,
        }
        ...
        onUpdate:  Object {
          "absoluteX": 88.15367126464844,
          "absoluteY": 351.3592529296875,
          "eventName": "77onGestureHandlerEvent",
          "handlerTag": 2,
          "numberOfPointers": 1,
          "state": 4,
          "translationX": 0,
          "translationY": 4.285099029541016,
          "velocityX": -0.0007893423899076879,
          "velocityY": 15.33845329284668,
          "x": 88.15367126464844,
          "y": 34.88865280151367,
        }
        onFinalize:  Object {
          "absoluteX": 88.15367126464844,
          "absoluteY": 351.3592529296875,
          "eventName": "77onGestureHandlerStateChange",
          "handlerTag": 2,
          "numberOfPointers": 1,
          "oldState": 4,
          "state": 5,
          "translationX": 0,
          "translationY": 4.285099029541016,
          "velocityX": -0.0007893423899076879,
          "velocityY": 15.33845329284668,
          "x": 88.15367126464844,
          "y": 34.88865280151367,
        }
     */




/*useLayoutEffect(()=>{
    const newBody = children[1]
    console.log('adskljfkadjsfjsdalkjf')
    if (newBody) setBody(React.cloneElement(newBody, {...newBody.props, intrinsic: { animatedStyle: animatedBodyStyle }}))
},[/!*animatedBodyStyle,*!/ children[1]])*/