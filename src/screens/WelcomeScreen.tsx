import React from 'react';
import {Text, Button} from "react-native";
import {useThemeNew} from "@h";

function WelcomeScreen() {
    const t = useThemeNew()

    let alreadyDark = false


    if (t.theme==='dark') alreadyDark = true

    return (
        <>
            <Text>{alreadyDark+""}</Text>
            <Text>{t.theme}</Text>
            <Text>Welcome!!!</Text>
            <Button title={"light"} onPress={()=>t.set('light')}/>
            <Button title={"dark"} onPress={()=>t.set('dark')}/>
        </>
    )
}

export { WelcomeScreen };