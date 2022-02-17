import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useTheme } from '@h'

const makeStyles = (theme, baseFontSize, exponentFontSize) => StyleSheet.create({
    root: {
        flexDirection: 'row'
    },
    baseView: {
        alignItems: 'flex-end'
    },
    base: {
        fontSize: baseFontSize,
        color: theme.font.color,
        fontFamily: theme.font.family
    },
    exponentView: {
        alignItems: 'flex-start'
    },
    exponent: {
        fontSize: exponentFontSize,
        marginBottom: 2,
        color: theme.font.color,
        fontFamily: theme.font.family
    }
})

function Sub({
    base, exponent,
    baseFontSize = 13, exponentFontSize = 10,
}) {
    const styles = useTheme(theme => makeStyles(theme, baseFontSize, exponentFontSize), [baseFontSize, exponentFontSize]);

    return (
        <View style={styles.root}>
            <View style={styles.baseView}>
                <Text style={styles.base}>{base}</Text>
            </View>
            <View style={styles.exponentView}>
                <Text style={styles.exponent}>{exponent}</Text>
            </View>
        </View>
    )
}

export { Sub };