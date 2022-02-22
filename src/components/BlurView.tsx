import React from 'react'
import {sg} from "@u2/utils";
import {WebView} from "react-native-webview";


type BlurViewType = {
    background?: string
    blur?: string
}

const BlurView = ({ background = 'rgba(255,255,255,0.2)', blur='48px' }:BlurViewType) => {
    return <WebView
        style={[sg.absolute, sg.transparent]}
        originWhitelist={['*']}
        source={{ html: `<div style="position: absolute; top: 0; right:0; bottom: 0; left: 0; background: ${background}; backdrop-filter: blur(${blur});"></div>` }}
    />
}
export default BlurView