import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'

function Icon() {
    return (
        <Svg width="375" height="599" viewBox="0 0 375 599" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M178.556 492.606C117.321 529.597 26.2444 549.664 -8 427.768V2L374.311 2.8645L383 435.981C242.956 413.936 228.644 462.349 178.556 492.606Z" fill="#5E30E6" />
            <Path d="M410.146 123.76C260.098 62.555 41.5282 341.276 -47 308.274L-20.9917 0H372.133C447.324 66.7552 560.193 184.964 410.146 123.76Z" fill="url(#paint0_linear)" />
            <Defs>
                <LinearGradient id="paint0_linear" x1="218.915" y1="-26" x2="218.915" y2="388.635" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#7B61FF" />
                    <Stop offset="1" stopColor="#7B61FF" stopOpacity="0" />
                    <Stop offset="1" stopColor="white" stopOpacity="0" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default Icon;