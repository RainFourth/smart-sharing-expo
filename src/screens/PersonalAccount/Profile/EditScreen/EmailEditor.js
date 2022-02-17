import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

function EmailEditor({
    title = '',
    value = null,
    type = 'email',
    onChange = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <View style={styles.root}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Input
                value={value}
                type={type}
                placeholder='example@example.com'
                keyboardType='email-address'
                onChange={onChange}
            />
        </View>
    )
}

export { EmailEditor }