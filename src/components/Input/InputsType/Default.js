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
        fontSize: 17,
        padding: 0,
    },
    errorText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.errorColor,
        letterSpacing: theme.font.letterSpacing3,
        fontSize: 10,
    },
    inputRootView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

function Default({
    placeholder = '', onChange = () => { },
    value = undefined,
    type = 'default', keyboardType = 'default',
    disabled = false, description = undefined,
    warning = undefined, multiline = false,
    maxLength = null, autoCompleteType = 'off'
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [displayWarning, setDisplayWarning] = useState(true);

    const [val, setVal] = useState('');

    useEffect(() => {
        if (value) setVal(value);
    }, [value])

    useEffect(() => {
        onChange(val);
        if (val !== '') setDisplayWarning(false);
        else setDisplayWarning(true);
    }, [val])

    return (
        <View style={{
            ...styles.root,
            opacity: disabled ? 0.5 : 1
        }}>
            <View style={styles.inputRootView}>
                <TextInput
                    style={{
                        ...styles.textInput,
                        flex: 1
                    }}
                    placeholder={placeholder}
                    onChangeText={text => setVal(text)}
                    keyboardType={keyboardType}
                    editable={!disabled}
                    multiline={multiline}
                    maxLength={maxLength && maxLength}
                    value={val}
                    autoCompleteType={autoCompleteType}
                />
                {description &&
                    <View>{description}</View>
                }
            </View>
            <View style={[
                styles.line,
                {
                    backgroundColor: val === '' ? theme.colors.red3 : theme.colors.dark3
                }
            ]} />
            {displayWarning && warning &&
                <Text style={styles.errorText}>{warning}</Text>
            }
            {errorText !== '' &&
                <Text style={styles.errorText}>{errorText}</Text>
            }
        </View>
    )
}

export { Default };