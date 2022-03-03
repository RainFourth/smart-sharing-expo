import React, {useCallback, useRef, useState} from 'react'
import {Pressable, StyleSheet, View} from "react-native";
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import {useDimens} from "@h/useDimens";
import {emptyFun, inf, nonEmpty} from "@u2/utils";
import {useThemeNew} from "@h";
import BlurView from "@c/BlurView";
import {AppStateType} from "@rx/appReducer";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import CircleBgcAnim from "@c/CircleBgcAnim";



const s = StyleSheet.create({
    box: {
        position: 'absolute', top:0, right:0, bottom:0, left:0,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: '2%'
        //backgroundColor: 'red'
    },
    pressable: {
        height:'100%', aspectRatio: 1,
        display:'flex', justifyContent: 'center', alignItems: 'center',
        //backgroundColor: '#ff000055',
    },
    bottomBarBox: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
        //backgroundColor: 'red'
    },
})




export type BottomTabBarType = {
    tab?: AppStateType['appNav']['tab']
    onTab?: (route: AppStateType['appNav']['tab']) => void
    height?: number
    zIndex?: number
}

const BottomTabBar = ( { tab, onTab = emptyFun, height = 80, zIndex }: BottomTabBarType ) => {

    //const boxRef = useRef<View>(null);
    //if (boxRef.current){
    //    console.log(boxRef.current.h)

        //console.log(boxRef.current.getBoundingClientRect().height)
    //}

    const { themeObj } = useThemeNew()


    const getIconColor = useCallback(
        (t: AppStateType['appNav']['tab']) => t===tab ? themeObj.mainColors.accent1 : themeObj.mainColors.secondary1,
        [tab,themeObj]
    )

    const [animMode1,setAnimMode1] = useState(undefined as 'start'|'end'|undefined)
    const onTouchStart1 = () => setAnimMode1('start')
    const onTouchEnd1 = () => setAnimMode1('end')
    const [animMode2,setAnimMode2] = useState(undefined as 'start'|'end'|undefined)
    const onTouchStart2 = () => setAnimMode2('start')
    const onTouchEnd2 = () => setAnimMode2('end')
    const [animMode3,setAnimMode3] = useState(undefined as 'start'|'end'|undefined)
    const onTouchStart3 = () => setAnimMode3('start')
    const onTouchEnd3 = () => setAnimMode3('end')
    const [animMode4,setAnimMode4] = useState(undefined as 'start'|'end'|undefined)
    const onTouchStart4 = () => setAnimMode4('start')
    const onTouchEnd4 = () => setAnimMode4('end')


    const icW = useDimens().w * 0.06

    return  <View style={[s.bottomBarBox, {height}, nonEmpty(zIndex)?{zIndex}:{}]}>

        <BlurView background={themeObj.bottomTabBar.color} blur="48px" />

        <View style={s.box} /*ref={boxRef}*/>
            <Pressable style={[s.pressable]}
                       onPress={()=>onTab('messages')}
                       onTouchStart={onTouchStart1}
                       onTouchEnd={onTouchEnd1}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent2} mode={animMode1}/>
                <MessageIc size={icW} color={getIconColor('messages')} />
            </Pressable>

            <Pressable style={s.pressable}
                       onPress={()=>onTab('map')}
                       onTouchStart={onTouchStart2}
                       onTouchEnd={onTouchEnd2}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent2} mode={animMode2}/>
                <LocationIc size={icW} color={getIconColor('map')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('favorites')}
                       onTouchStart={onTouchStart3}
                       onTouchEnd={onTouchEnd3}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent2} mode={animMode3}/>
                <HeartIc size={icW} color={getIconColor('favorites')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('profile')}
                       onTouchStart={onTouchStart4}
                       onTouchEnd={onTouchEnd4}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent2} mode={animMode4}/>
                <UserIc size={icW} color={getIconColor('profile')} />
            </Pressable>
        </View>

    </View>
}
export default BottomTabBar