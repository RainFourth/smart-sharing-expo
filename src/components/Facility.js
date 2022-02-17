import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 70,
        marginTop: 24
    },
    iconView: {
        backgroundColor: theme.facility.backgroundColor,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    text: {
        fontFamily: theme.font.familyBold,
        color: theme.font.color,
        letterSpacing: theme.facility.letterSpacing,
        marginTop: 3,
        fontSize: 10,
        textAlign: 'center'
    }
})

function Facility({ icon, name }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        icon &&
        <View style={styles.root}>
            <View style={styles.iconView}>
                {icon}
            </View>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

export { Facility };