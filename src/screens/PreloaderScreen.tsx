import React from 'react';
import { ThemeType } from "@t";
import { StyleSheet, View } from "react-native";
import { useThemeNew } from "@h";
import Spinner from "@c/Spinner";


const makeStyles = (theme: ThemeType) => StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.mainColors.bgcAccent
    }
})


function PreloaderScreen() {
    const { style: s, themeObj } = useThemeNew(makeStyles)

    return <View style={s.screen}>
        <Spinner color={themeObj.mainColors.onBgcAccent} size={50} />
    </View>
}

export { PreloaderScreen };
export default PreloaderScreen