import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Input } from '@c';
import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {

    },
    title: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
    }
})

function PhoneEditor({
    title = '',
    value = null,
    type = 'phone',
    onChange = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <View style={styles.root}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Input
                value={value}
                type={type}
                placeholder='+7 (999) 999 99 - 99'
                keyboardType='phone-pad'
                onChange={onChange}
            />
        </View>
    )
}

export { PhoneEditor }