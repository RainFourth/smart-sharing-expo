import {Dimensions} from "react-native";


export const useDimens = (of: 'window' | 'screen' = 'window') => {
    const { width, height } = Dimensions.get(of)
    return { w: width, h: height }
}