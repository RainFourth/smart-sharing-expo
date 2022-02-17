import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    line: {
        marginTop: 24,
        height: 1,
        backgroundColor: theme.colors.line
    },
    mainView: {
        flexWrap: 'wrap',
        marginTop: 26,
        height: 20,
        alignContent: 'space-between'
    },
    text: {
        fontSize: 17,
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color
    }
})

function DropDownListHeader({
    name, open, setOpen
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <>
            <View style={styles.line} />
            <TouchableOpacity
                onPress={() => setOpen(!open)}
                style={styles.mainView}
            >
                <Text style={styles.text}>{name}</Text>
                <Feather
                    name={open ? 'chevron-up' : 'chevron-down'}
                    size={24}
                />
            </TouchableOpacity>
        </>
    )
}

export { DropDownListHeader };