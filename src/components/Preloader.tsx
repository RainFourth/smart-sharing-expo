import React, { useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeNew } from '@h';
import { ThemeType } from "@t";

const makeStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor.mainColor
    }
})

function Preloader() {
    const { themeObj, themeLoaded } = useThemeNew()
    const s = useMemo(()=>makeStyles(themeObj),[themeObj])

    return (
        <View style={s.container}>
            <ActivityIndicator
                size='large'
                color={themeObj.preloader.spinnerColor}
            />
        </View>
    )
}

export { Preloader };