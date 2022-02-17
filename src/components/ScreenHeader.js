import React from 'react';
import {
    StyleSheet, View,
    TouchableOpacity, Text,
    StatusBar
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme, useThemeObj } from '@h';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const makeStyles = (theme) => StyleSheet.create({
    header: {
        backgroundColor: theme.backgroundColor.mainColor,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    back: {
        zIndex: 2,
        padding: 10,
        flex: 1
    },
    headerText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontWeight: 'bold',
        fontSize: 17,
        flex: 3,
        textAlign: 'center',
    },
    HeaderVoidView: {
        flex: 1,
        padding: 10
    },
})

function ScreenHeader({ onBackPress = () => { }, header }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.back}
                onPress={onBackPress}
            >
                <Feather
                    name='arrow-left'
                    size={24}
                    color={theme.font.color}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>{header}</Text>
            <View style={styles.HeaderVoidView} />
        </View>
    )
}

export { ScreenHeader };