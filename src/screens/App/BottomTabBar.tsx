import React, {useCallback, useState} from 'react'
import {GestureResponderEvent, Pressable, StyleSheet, View} from "react-native";
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import {emptyFun, inf, nonEmpty} from "@u2/utils";
import {useThemeNew} from "@h";
import BlurView from "@c/BlurView";
import {AppStateType, setAppNavTab} from "@rx/appReducer";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming} from "react-native-reanimated";
import CircleBgcAnim from "@c/CircleBgcAnim";
import {sg} from "@u2/styleGlobal";
import {useKeyboard} from "@h/useKeyboard";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";



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
})


type BottomTabBarType = { }
const BottomTabBar = ( { }: BottomTabBarType ) => {

    const { themeObj } = useThemeNew()

    const d = useDispatch()
    const { tab, bottomBarHeight } = useSelector((s:StateType)=>s.app.appNav)

    const onTab = (tab: AppStateType['appNav']['tab']) => d(setAppNavTab(tab))

    const getIconColor = useCallback(
        (t: AppStateType['appNav']['tab']) => t===tab ? themeObj.mainColors.accent2 : themeObj.mainColors.secondary1,
        [tab,themeObj]
    )



    const [animMode1,setAnimMode1] = useState(undefined as 'start'|'end'|undefined)
    const [animMode2,setAnimMode2] = useState(undefined as 'start'|'end'|undefined)
    const [animMode3,setAnimMode3] = useState(undefined as 'start'|'end'|undefined)
    const [animMode4,setAnimMode4] = useState(undefined as 'start'|'end'|undefined)

    const [kbd] = useKeyboard()


    return  <View style={[sg.absolute, { top:undefined, height: bottomBarHeight }]}>

        {/* if it is shown when kbd shown then kbd dismiss by input focus blur, then layout jump up for a second */}
        { !kbd && <BlurView background={themeObj.bottomTabBar.color} blur="48px" /> }


        <View style={s.box} /*ref={boxRef}*/>
            <Pressable style={[s.pressable]}
                       onPress={()=>onTab('messages')}
                       onTouchStart={()=>setAnimMode1('start')}
                       onTouchEndCapture={()=>setAnimMode1('end')}

            >
                <CircleBgcAnim color={themeObj.mainColors.accent3} mode={animMode1} />
                <MessageIc size={'30%'} color={getIconColor('messages')} />
            </Pressable>

            <Pressable style={s.pressable}
                       onPress={()=>onTab('map')}
                       onTouchStart={()=>setAnimMode2('start')}
                       onTouchEndCapture={()=>setAnimMode2('end')}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent3} mode={animMode2}/>
                <LocationIc size={'30%'} color={getIconColor('map')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('favorites')}
                       onTouchStart={()=>setAnimMode3('start')}
                       onTouchEndCapture={()=>setAnimMode3('end')}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent3} mode={animMode3}/>
                <HeartIc size={'30%'} color={getIconColor('favorites')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('profile')}
                       onTouchStart={()=>setAnimMode4('start')}
                       onTouchEndCapture={()=>setAnimMode4('end')}
            >
                <CircleBgcAnim color={themeObj.mainColors.accent3} mode={animMode4}/>
                <UserIc size={'30%'} color={getIconColor('profile')} />
            </Pressable>
        </View>

    </View>
}
export default BottomTabBar