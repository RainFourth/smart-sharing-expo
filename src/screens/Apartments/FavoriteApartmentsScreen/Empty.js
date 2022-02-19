import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@h'

import FavoriteEmpty from '@ic/FavoriteEmpty';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20
    },
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        marginTop: 27,
        fontSize: 17,
    },
    description: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17,
        marginTop: 16
    },
    search: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        //color: theme.font.linkColor,
        fontSize: 15,
        marginTop: 10,
        color: '#3417BF',
        textDecorationLine: 'underline'
    },
    image: {
        marginTop: 32
    }
})

function Empty({ onSearch }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <View style={styles.root}>
            <Text style={styles.header}>Пока здесь ничего нет</Text>
            <Text style={styles.description}>Когда найдете понравившееся жилье, нажмите на сердечко, для его сохранения.</Text>
            <TouchableOpacity
                onPress={onSearch}
            >
                <Text style={styles.search}>Отправиться на поиски</Text>
            </TouchableOpacity>
            <View style={styles.image}>
                <FavoriteEmpty />
            </View>
        </View>
    )
}

export { Empty };