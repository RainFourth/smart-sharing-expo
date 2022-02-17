import React, { useState, useEffect } from 'react';
import {
    View, TextInput,
    StyleSheet, Text
} from 'react-native';

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
    },
    errorText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.errorColor,
        letterSpacing: theme.font.letterSpacing3,
        fontSize: 10,
    }
})

function Email({
    value = null,
    placeholder = '', onChange = () => { },
    type = 'default', keyboardType = 'default'
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [val, setVal] = useState('');

    useEffect(() => {
        if (value !== null) {
            setVal(value);
            setError(false);
        }
    }, [value])

    useEffect(() => {
        if (val !== '') {
            onChange(val);
        }
    }, [val])

    return (
        <View style={styles.root}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={val}
                onChangeText={text => {
                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                    if (!reg.test(text)) {
                        setError(true);
                        setErrorText('Некорретная почта');
                    } else {
                        setError(false);
                        setErrorText('')
                        setVal(text)
                    }
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
            {errorText !== '' &&
                <Text style={styles.errorText}>{errorText}</Text>
            }
        </View>
    )
}

export { Email };