import React from 'react';
import { ThemeType } from "@t";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useThemeNew } from "@h";


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
        <ActivityIndicator
            size={50}
            color={themeObj.mainColors.onBgcAccent}
        />
    </View>
}

export { PreloaderScreen };
export default PreloaderScreen