import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme, selected) => StyleSheet.create({
    categoryText: {
        fontSize: 15,
        color: selected ? theme.category.selected.textColor : theme.category.textColor,
        fontFamily: theme.font.family,
        letterSpacing: theme.category.letterSpacing
    },
    categoryView: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: selected ? theme.category.selected.backgroundColor : theme.category.backgroundColor,
        borderRadius: 16,
        marginRight: 8
    }
})

function Category({ selected, onPress, name }) {
    const styles = useTheme(theme => makeStyles(theme, selected), [selected])

    return (
        <TouchableOpacity
            style={styles.categoryView}
            onPress={onPress}
        >
            <Text
                style={styles.categoryText}
            >{name}</Text>
        </TouchableOpacity>
    )
}

export { Category };