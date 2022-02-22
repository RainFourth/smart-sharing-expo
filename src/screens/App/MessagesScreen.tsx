import React from 'react'
import {emptyFun, sg} from "@u2/utils";
import BottomTabBar, {Route} from "@sc/App/BottomTabBar";
import {View} from "react-native";
import {Messages} from "@sc";






type MessagesScreenType = {
    setRoute?: (route: Route) => void
}
const MessagesScreen = ({setRoute = emptyFun}:MessagesScreenType) => {

    return <View style={{flex: 1}}>

        <Messages.MainScreen/>

        <BottomTabBar route={'messages'} onRoute={setRoute} />

    </View>
}
export default MessagesScreen