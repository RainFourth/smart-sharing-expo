import React from 'react';
import {
    StyleSheet, View,
    Text
} from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        minHeight: 60,
        flexDirection: 'row',
        alignItems: "center",
        margin: 20,
        backgroundColor: theme.infoMessage.error.backgroundColor,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textView: {
        flex: 1,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: theme.infoMessage.error.textColor,
        letterSpacing: theme.infoMessage.letterSpacing,
        fontFamily: theme.font.family
    },
    iconView: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function InfoMessage({
    data = '', icon
}) {
    const styles = useTheme(theme => makeStyles(theme), [])

    return (
        <View style={styles.root}>
            {icon &&
                <View style={styles.iconView}>{icon}</View>
            }
            <View style={styles.textView}>
                <Text style={styles.text}>{data}</Text>
            </View>
        </View>
    )
}

export { InfoMessage }