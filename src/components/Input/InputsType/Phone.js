import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedInput from 'react-native-masked-input-text';

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
        padding: 0,
        fontSize: 17
    }
})

function Phone({
    value = null,
    placeholder, onChange,
    type = 'default', keyboardType = 'default'
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(true);

    const [val, setVal] = useState('');

    useEffect(() => {
        if (value !== null) {
            setVal(value);
            setError(false)
        }
    }, [value])

    useEffect(() => {
        if (val.length === 20)
            onChange(val);
    }, [val]);

    return (
        <View style={styles.root}>
            <MaskedInput
                style={styles.textInput}
                mask={'+7 (000) 000 00 - 00'}
                placeholder={'+7 (000) 000 00 - 00'}
                keyboardType={'phone-pad'}
                onChangeText={text => {
                    if (text.length !== 20) setError(true);
                    if (text.length < 21) setVal(text);
                    if (text.length > 19) setError(false);
                }}
                value={val}
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

export { Phone };