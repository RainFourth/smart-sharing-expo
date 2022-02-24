import React from 'react'
import { ActivityIndicator } from "react-native";


const Spinner = ({color, size = 50}:{color:string, size?: number}) => {
    return <ActivityIndicator size={size} color={color}/>
}
export default Spinner