import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Sub } from '@c';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginVertical: 40,
    },
    rootInputView: {
        flexDirection: 'row'
    },
    view: {
        height: 20,
        flex: 1,
        marginHorizontal: 5
    },
    input: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    leftText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17,
        flex: 1
    },
    inputView: {
        flex: 4.5,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    inputText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17,
        padding: 0
    },
    rightText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        flex: 1,
        alignItems: 'flex-end'
    },
    line: {
        height: 1,
        backgroundColor: theme.colors.dark3,
        marginHorizontal: 3,
        marginTop: 10
    },
    header: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
        marginBottom: 20
    }
})

function DoubleInput({
    type = 'void', header,
    onMinChange, onMaxChange,
    minValue, maxValue
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <View style={styles.root}>
            {header &&
                <Text style={styles.header}>
                    {header}
                </Text>
            }
            <View style={styles.rootInputView}>
                <View style={styles.view}>
                    <View style={styles.input}>
                        <Text style={styles.leftText}>
                            от
                        </Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                placeholderTextColor='#000'
                                keyboardType='number-pad'
                                value={minValue && String(minValue)}
                                onChangeText={onMinChange}
                            />
                        </View>
                        {type === 'area' &&
                            <View style={styles.rightText} >
                                <Sub base='м' exponent='2' baseFontSize={17} exponentFontSize={13} />
                            </View>
                        }
                        {type === 'price' &&
                            <View style={styles.rightText} >
                                <Text style={styles.leftText}>Р.</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.line} />
                </View>
                <View style={styles.view}>
                    <View style={styles.input}>
                        <Text style={styles.leftText}>
                            до
                        </Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                placeholderTextColor='#000'
                                keyboardType='number-pad'
                                value={maxValue && String(maxValue)}
                                onChangeText={onMaxChange}
                            />
                        </View>
                        {type === 'area' &&
                            <View style={styles.rightText} >
                                <Sub base='м' exponent='2' baseFontSize={17} exponentFontSize={13} />
                            </View>
                        }
                        {type === 'price' &&
                            <View style={styles.rightText} >
                                <Text style={styles.leftText}>Р.</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.line} />
                </View>
            </View>
        </View>
    )
}

export { DoubleInput }