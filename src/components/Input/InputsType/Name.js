import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginVertical: 15
    },
    line: {
        height: 1,
        marginTop: 10
    },
    textInput: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing1,
        fontSize: 17,
        padding: 0,
    }
})

function Name({
    placeholder, onChange,
    type = 'default', keyboardType = 'default'
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(false);

    const [val, setVal] = useState('');

    useEffect(() => {
        if (val.length < 1)
            setError(true);
        else {
            setError(false)
            onChange(val);
        }
    }, [val]);

    return (
        <View style={styles.root}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                onChangeText={text => {
                    setVal(text)
                }}
                autoCompleteType={type}
                keyboardType={keyboardType}
            />
            <View style={[
                styles.line,
                {
                    backgroundColor: error ? theme.colors.red3 : theme.colors.dark3
                }
            ]} />
        </View>
    )
}

export { Name };