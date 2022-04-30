import {ScrollView, TextInput, View} from "react-native";
import {sg} from "@u2/styleGlobal";
import React from "react";


export default ()=>{


    return <View style={[sg.absolute, {display: 'flex'}]}>
        <TextInput style={{height: 100, width:'100%', backgroundColor: 'blue'}}></TextInput>
        <View style={{flex:1, backgroundColor:'green'}}>
            <ScrollView>
                <View style={{backgroundColor: 'red', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'white', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'red', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'white', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'red', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'white', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'red', height: 100, width:'100%'}} ></View>
                <View style={{backgroundColor: 'white', height: 100, width:'100%'}} ></View>
            </ScrollView>

        </View>
    </View>
}