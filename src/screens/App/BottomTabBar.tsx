import React, {useCallback, useRef} from 'react'
import {Pressable, StyleSheet, View} from "react-native";
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import {useDimens} from "@h/useDimens";
import {emptyFun, nonEmpty} from "@u2/utils";
import {useThemeNew} from "@h";
import BlurView from "@c/BlurView";
import {AppStateType} from "@rx/appReducer";



const s = StyleSheet.create({
    box: {
        position: 'absolute', top:0, right:0, bottom:0, left:0,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: '2%'
        //backgroundColor: 'red'
    },
    pressable: {
        flex:1, height:'100%',
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


    const icW = useDimens().w * 0.06

    return  <View style={[s.bottomBarBox, {height}, nonEmpty(zIndex)?{zIndex}:{}]}>

        <BlurView background={themeObj.bottomTabBar.color} blur="48px" />

        <View style={s.box} /*ref={boxRef}*/>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('messages')}>
                <MessageIc size={icW} color={getIconColor('messages')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('map')}>
                <LocationIc size={icW} color={getIconColor('map')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('favorites')}>
                <HeartIc size={icW} color={getIconColor('favorites')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onTab('profile')}>
                <UserIc size={icW} color={getIconColor('profile')} />
            </Pressable>
        </View>

    </View>
}
export default BottomTabBar