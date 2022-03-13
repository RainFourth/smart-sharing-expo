import {StatusBar, View} from "react-native";
import {sg} from "@u2/styleGlobal";
import React from "react";


function StatusBarExample(){
    return <>

        <StatusBar
            // translucent={true} means app will draw under status bar
            translucent={true}

            // Autoanimate changes of backgroundColor, barStyle, hidden
            animated={true}

            // barStyle="default" | "light-content" | "dark-content"
            // Color of the status bar text/icons
            barStyle="dark-content"

            //backgroundColor="rgba(255,255,255,0)"
            backgroundColor="#00ff0030"
        />

        <View style={[sg.absolute, {backgroundColor: 'aquamarine'}]}>

        </View>

    </>
}
export default StatusBarExample