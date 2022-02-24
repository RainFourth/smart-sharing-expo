import React from 'react'
import {View} from "react-native";
import {Messages} from "@sc";



export type MessagesScreenType = {}

const MessagesScreen = ({}:MessagesScreenType) => {

    return <View style={{flex: 1}}>

        <Messages.MainScreen/>


    </View>
}
export default MessagesScreen