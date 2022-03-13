import {Pressable, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {sg} from "@u2/styleGlobal";
import React, {useState} from "react";
import BottomSheet, {BottomSheetSettings} from "@c/BottomSheet/BottomSheet";
import BottomSheetBody from "@c/BottomSheet/BottomSheetBody";
import BottomSheetHeader from "@c/BottomSheet/BottomSheetHeader";
import {inf} from "@u2/utils";
import {fonts2} from "@t/fonts";


const snapPoints = ['-15%','25%', '50%', '75%']
const startIdx = 3
const resetIdx = 2
const headerTitle = 'Title 🎉'




const s = StyleSheet.create({

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

function ExampleBottomSheet(){

    const [settings, setSettings] = useState({} as BottomSheetSettings)

    return <View style={[sg.absolute, {backgroundColor: 'aquamarine'}]}>

        <Pressable
            style={[sg.absolute, /*{backgroundColor: 'blue'}*/]}
            onPress={()=>{
                console.log('Screen pressed!!!')
                setSettings({ index: resetIdx })
            }}
        />

        <BottomSheet
            snapPoints={snapPoints}
            initialSettings={{index: startIdx}}
            newSettings={settings}
            enableCloseOnZeroSnap={true}
            onChange={(closed, idx)=>console.log('onChange', idx, closed)}
        >

            <BottomSheetHeader>
                <View style={s.headerBox}>
                    <View style={s.dash}/>
                    <View style={[sg.absolute, sg.centerContent]}>
                        <Text style={s.headerTitle}>{headerTitle}</Text>
                    </View>
                </View>
            </BottomSheetHeader>


            <BottomSheetBody>
                <ScrollView style={s.list} keyboardShouldPersistTaps='always'>
                    <View style={{backgroundColor: 'red', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'white', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'green', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'aqua', height: 100, width:'100%'}} ></View>
                    <ScrollView horizontal keyboardShouldPersistTaps='always'>
                        <View style={{backgroundColor: 'red', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'white', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'green', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'aqua', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'purple', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'yellow', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'blue', height: 100, width:100}} ></View>
                        <View style={{backgroundColor: 'black', height: 100, width:100}} ></View>
                    </ScrollView>
                    <View style={{backgroundColor: 'purple', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'yellow', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'blue', height: 100, width:'100%'}} ></View>
                    <View style={{backgroundColor: 'black', height: 100, width:'100%'}} ></View>
                </ScrollView>
            </BottomSheetBody>

        </BottomSheet>

    </View>
}
export default ExampleBottomSheet