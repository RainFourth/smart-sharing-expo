import React, { useState, useEffect } from 'react';
import {
    TextInput, View,
    StyleSheet, Text
} from 'react-native';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginVertical: 15
    },
    errorText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.errorColor,
        letterSpacing: theme.font.letterSpacing3,
        fontSize: 10,
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
    inputHeader: {
        fontFamily: theme.font.family,
        color: theme.font.headerColor,
        letterSpacing: theme.font.letterSpacing2,
        fontSize: 13,
        fontWeight: '400'
    }
})

function Password({
    placeholder, onChange,
    type = 'default', keyboardType = 'default',
    confirmation = false, startErrroText = true,
    check = true
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('Пароль должен быть длиннее 8 символов, не содержать пробелов, содержать строчные и заглавные буквы, цифры, один из символов !@#\$%\^&\*');

    const [confirmationError, setConfirmationError] = useState(true);
    const [confirmationErrorText, setConfirmationErrorText] = useState('Пароли не совпадают')

    const [val, setVal] = useState('');
    const [val2, setVal2] = useState('');

    const reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.!@#\$%\^&\*])(?=.{8,})/;

    useEffect(() => {
        if (!startErrroText)
            setErrorText('');
    }, [])

    useEffect(() => {
        if (!check && !confirmation)
            onChange(val);

        if (val.length > 7) {
            if (reg.test(val)) {
                setError(false);
                if (!confirmation) {
                    onChange(val);
                }
            } else {
                setError(true);
            }
        } else
            setError(true);
    }, [val]);

    useEffect(() => {
        if (confirmation && val.length > 7 && val === val2) {
            setConfirmationError(false);
            onChange(val2);
        } else {
            setConfirmationError(true);
        }
    }, [val2]);

    return (
        <>
            <View style={styles.root}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    value={val}
                    onChangeText={(text) => setVal(text)}
                    autoCompleteType={type}
                    keyboardType={keyboardType}
                    secureTextEntry={true}
                />
                <View style={[
                    styles.line,
                    {
                        backgroundColor: error ? theme.colors.red3 : theme.colors.dark3
                    }
                ]} />
                {error &&
                    <Text style={styles.errorText}>{errorText}</Text>
                }
            </View>
            {confirmation &&
                <>
                    <Text style={styles.inputHeader}>ПОДТВЕРДИТЕ ПАРОЛЬ</Text>
                    <View style={styles.root}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={placeholder}
                            value={val2}
                            onChangeText={(text) => setVal2(text)}
                            autoCompleteType={'password'}
                            keyboardType={keyboardType}
                            secureTextEntry={true}
                        />
                        <View style={[
                            styles.line,
                            {
                                backgroundColor: confirmationError ? theme.colors.red3 : theme.colors.dark3
                            }
                        ]} />
                        {confirmationError &&
                            <Text style={styles.errorText}>{confirmationErrorText}</Text>
                        }
                    </View>
                </>
            }
        </>
    )
}

export { Password };