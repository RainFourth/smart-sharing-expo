import {useLayoutEffect, useState} from "react";
import {Keyboard} from "react-native";


export const useKeyboard = () => {
    const [isShown, setIsShown] = useState(false)

    useLayoutEffect(()=>{
        const subscriptionShow = Keyboard.addListener('keyboardDidShow', () => setIsShown(true))
        const subscriptionHide = Keyboard.addListener('keyboardDidHide', () => setIsShown(false))
        return () => {
            Keyboard.removeSubscription(subscriptionShow)
            Keyboard.removeSubscription(subscriptionHide)
        }
    })

    return [isShown] as const
}