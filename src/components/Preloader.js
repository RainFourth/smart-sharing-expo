import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor.mainColor
    }
})

function Preloader() {
    const styles = useTheme((theme) => makeStyles(theme), []);
    const theme = useThemeObj();

    return (
        <View
            style={styles.container}
        >
            <ActivityIndicator
                size='large'
                color={theme.preloader.spinnerColor}
            />
        </View>
    )
}

export { Preloader };