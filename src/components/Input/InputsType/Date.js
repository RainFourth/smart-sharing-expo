import dateValidator from 'datevalidator';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaskedInput from 'react-native-masked-input-text';

import { useTheme, useThemeObj } from '@h';
import { datee } from '@u';

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');

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

function DateInput({
    value = null,
    placeholder = '',
    onChange = () => { },
    keyboardType = 'default'
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [val, setVal] = useState('');

    useEffect(() => {
        if (value !== null) {
            setVal(fromMSK(value).toString('date'));
        }
    }, [value])

    useEffect(() => {
        if (val.length > 9) {
            let date = val.match(/\d+/g);
            date.reverse();

            if (!dateValidator.validate(...date)) {
                setError(true);
                setErrorText('Некорректная дата');
                return;
            }

            const now = new Date();

            if (date[0] > now.getFullYear() - 18 || date[0] < now.getFullYear() - 150) {
                setError(true);
                setErrorText('Вам должно быть больше 18 лет');
                return;
            }

            setErrorText('');

            date = new Date(...date).getTime() + new Date().getTimezoneOffset() * 60 * 1000;
            onChange(date);
        }
    }, [val]);

    return (
        <View style={styles.root}>
            <MaskedInput
                style={styles.textInput}
                mask={'00.00.0000'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={text => {
                    if (text.length !== 10) setError(true);
                    if (text.length < 11) setVal(text);
                    if (text.length > 9) {
                        setError(false);
                        setErrorText('');
                    }
                }}
                value={val}
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

export { DateInput };