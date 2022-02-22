import React, {useRef} from 'react'
import {Pressable, StyleSheet, View} from "react-native";
import MessageIc from "@c/SvgIcons/MessageIc";
import LocationIc from "@c/SvgIcons/LocationIc";
import HeartIc from "@c/SvgIcons/HeartIc";
import UserIc from "@c/SvgIcons/UserIc";
import {useDimens} from "@h/useDimens";

const icColor = '#5C5C5C'
const icSelectedColor = 'black'

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
    }
})

const BottomTabBar = ({ selected }:{ selected: 'messages' | 'location' | 'favorites' | 'profile' }) => {

    //const boxRef = useRef<View>(null);
    //if (boxRef.current){
    //    console.log(boxRef.current.h)

        //console.log(boxRef.current.getBoundingClientRect().height)
    //}



    const icW = useDimens().w * 0.06

    return <View style={s.box}
        //ref={boxRef}
    >
        <Pressable style={[s.pressable, {/*backgroundColor: '#ff000055'*/}]} onPress={()=>alert("Messages")}>
            <MessageIc size={icW} color={selected==='messages' ? icSelectedColor : icColor} />
        </Pressable>
        <Pressable style={s.pressable} onPress={()=>alert("Location")}>
            <LocationIc size={icW} color={selected==='location' ? icSelectedColor : icColor} />
        </Pressable>
        <Pressable style={s.pressable} onPress={()=>alert("Favorite")}>
            <HeartIc size={icW} color={selected==='favorites' ? icSelectedColor : icColor} />
        </Pressable>
        <Pressable style={s.pressable} onPress={()=>alert("Profile")}>
            <UserIc size={icW} color={selected==='profile' ? icSelectedColor : icColor} />
        </Pressable>
    </View>
}
export default BottomTabBar