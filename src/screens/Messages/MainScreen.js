import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import { Container } from '@c';
import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 34
    },
})

function MainScreen() {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <Container>
            <View style={styles.root}>
                <Text style={styles.header}>Сообщения</Text>
            </View>
        </Container>
    )
}

export { MainScreen };