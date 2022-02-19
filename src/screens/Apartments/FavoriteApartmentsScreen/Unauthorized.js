import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@h';

import FavoriteUnauthorized from '@ic/FavoriteUnauthorized';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20,
    },
    description: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17,
        marginTop: 16,
    },
    button: {
        width: 112,
        marginTop: 16,
        backgroundColor: theme.button.backgroundColor.main,
        paddingVertical: 13,
        paddingHorizontal: 32,
        alignItems: 'center',
        borderRadius: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    buttonText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 15,
        color: theme.button.textColor.main
    },
    image: {
        marginTop: 32
    }
})

function Unauthorized({ signIn }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <View style={styles.root}>
            <Text style={styles.description}>Нажимайте на сердечко и добавляйте места в которых хотели бы пожить.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={signIn}
            >
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <View style={styles.image} >
                <FavoriteUnauthorized />
            </View>
        </View>
    )
}

export { Unauthorized }