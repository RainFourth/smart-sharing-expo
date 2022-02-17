import React from 'react';
import {
    TouchableOpacity, View,
    Text, StyleSheet
} from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    descriptionButtonMainView: {
        marginTop: 16
    },
    descriptionButtonView: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    descriptionButtonText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 15,
        textDecorationLine: 'underline',
    }
})

function MoreDetails({ text, onPress, icon }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    return (
        <TouchableOpacity
            style={styles.descriptionButtonMainView}
            onPress={onPress}
        >
            <View style={styles.descriptionButtonView}>
                <Text style={styles.descriptionButtonText}>{text}</Text>
                {icon &&
                    icon
                }
            </View>
        </TouchableOpacity>
    )
}

export { MoreDetails };