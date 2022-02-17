import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import AuthMethodSelectBackground from '@assets/AuthMethodSelectBackground';
import { Container, Button } from '@c';

import { useTheme, useThemeObj } from '@h';

import { OAuthComponent } from './OAuthComponent';

const makeStyles = (theme) => StyleSheet.create({
    title: {
        marginTop: 235,
        marginLeft: 30,
        fontFamily: theme.font.familyBold,
        fontWeight: 'bold',
        letterSpacing: theme.font.letterSpacing3,
        color: theme.font.cityColor,
        fontSize: 48,
    },
    line: {
        height: 3,
        width: 262,
        backgroundColor: '#FF3B3B',
        marginLeft: 30
    },
    description: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.cityColor,
        fontSize: 15,
        marginLeft: 30,
        marginTop: 30,
    },
    authView: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 0
    }
})

function MethodSelectionScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    return (
        <Container>
            <View style={{ position: 'absolute', marginTop: -10 }}>
                <AuthMethodSelectBackground />
            </View>
            <Text style={styles.title}>SMART SHARING</Text>
            <View style={styles.line} />
            <Text style={styles.description}>{'Выбирай среди 1000 квартир\nИзучай новые города'}</Text>
            <View style={styles.authView}>
                <View style={styles.buttonView}>
                    <Button
                        placeholder='Вход'
                        style={styles.button}
                        onPress={() => navigation.push('SignInScreen', { redirectScreen: 'MapScreen' })}
                    />
                    <Button
                        placeholder='Регистрация'
                        style={styles.button}
                        buttonStyle={{ backgroundColor: theme.button.backgroundColor.disabled }}
                        textStyle={{ color: theme.button.textColor.disabled }}
                        onPress={() => navigation.push('SignUpScreen')}
                    />
                </View>
                <OAuthComponent redirectScreen={'MapScreen'} />
            </View>
        </Container>
    )
}

export { MethodSelectionScreen };