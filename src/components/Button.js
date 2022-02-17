import React from 'react';
import {
    TouchableOpacity, View,
    Text, StyleSheet
} from 'react-native';

import { useTheme } from '@h'

const makeStyles = (theme, square, disabled, style, buttonStyle, textStyle) => StyleSheet.create({
    touch: {
        marginHorizontal: 20,
        height: 44,
        marginTop: 14,
        marginBottom: 50,
        ...style
    },
    view: {
        flex: 1,
        backgroundColor: !disabled ? theme.button.backgroundColor.main : theme.button.backgroundColor.disabled,
        borderRadius: square ? 5 : 22,
        justifyContent: 'center',
        alignItems: 'center',
        ...buttonStyle
    },
    text: {
        color: !disabled ? theme.button.textColor.main : theme.button.textColor.disabled,
        fontFamily: theme.font.family,
        letterSpacing: theme.button.letterSpacing,
        fontSize: 15,
        ...textStyle
    }
})

function Button({
    placeholder, onPress,
    square = false,
    style = {},
    buttonStyle = {},
    textStyle = {},
    disabled = false
}) {
    const styles = useTheme(theme =>
        makeStyles(theme, square, disabled, style, buttonStyle, textStyle),
        [square, disabled, style, buttonStyle, textStyle]);

    return (
        <TouchableOpacity style={styles.touch} onPress={onPress} disabled={disabled}>
            <View style={styles.view}>
                <Text style={styles.text}>{placeholder}</Text>
            </View>
        </TouchableOpacity>
    )
}

export { Button };