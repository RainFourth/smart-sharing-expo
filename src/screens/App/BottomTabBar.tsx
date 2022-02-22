import React, {useCallback, useRef} from 'react'
import {Pressable, StyleSheet, View} from "react-native";
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import {useDimens} from "@h/useDimens";
import {emptyFun} from "@u2/utils";
import {useThemeNew} from "@h";
import BlurView from "@c/BlurView";



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




export type Route = 'messages' | 'map' | 'favorites' | 'profile'
export type BottomTabBarType = {
    route?: Route
    onRoute?: (route: Route) => void
}

const BottomTabBar = ( { route = 'map', onRoute = emptyFun }: BottomTabBarType ) => {

    //const boxRef = useRef<View>(null);
    //if (boxRef.current){
    //    console.log(boxRef.current.h)

        //console.log(boxRef.current.getBoundingClientRect().height)
    //}

    const { themeObj } = useThemeNew()


    const getIconColor = useCallback(
        (r: Route) => r===route ? themeObj.mainColors.accent : themeObj.mainColors.bgcElem,
        [themeObj]
    )


    const icW = useDimens().w * 0.06

    return  <View style={s.bottomBarBox}>

        <BlurView background="rgba(255,255,255,0.2)" blur="48px" />

        <View style={s.box} /*ref={boxRef}*/>
            <Pressable style={[s.pressable, {/*backgroundColor: '#ff000055'*/}]}
                       onPress={()=>onRoute('messages')}>
                <MessageIc size={icW} color={getIconColor('messages')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onRoute('map')}>
                <LocationIc size={icW} color={getIconColor('map')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onRoute('favorites')}>
                <HeartIc size={icW} color={getIconColor('favorites')} />
            </Pressable>
            <Pressable style={s.pressable}
                       onPress={()=>onRoute('profile')}>
                <UserIc size={icW} color={getIconColor('profile')} />
            </Pressable>
        </View>

    </View>
}
export default BottomTabBar