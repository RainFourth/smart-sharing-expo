import { Dimensions } from "react-native";


export const getDimens = (of: 'window' | 'screen' = 'window') => {
    const { width, height } = Dimensions.get(of)
    return { w: width, h: height }
}
export const getWDimens = getDimens('window')
export const getSDimens = getDimens('screen')
