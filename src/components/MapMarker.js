import React from 'react';
import {
    TouchableOpacity, View,
    Text, StyleSheet
} from 'react-native';

import { useTheme, useThemeObj } from '@h';
import { splitePrice } from '@u';

const makeStyles = (theme, selected) => StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: selected ? theme.marker.selected.backgroundColor : theme.marker.backgroundColor,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    priceText: {
        fontFamily: theme.marker.font,
        color: theme.marker.textColor,
        fontSize: 13
    },
    circleView: {
        height: 10,
        width: 10,
        backgroundColor: theme.marker.circleColor,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    shadowView: {
        height: 2,
        width: 2,
        borderRadius: 2,
        transform: [
            { scaleX: 4 }
        ],
        backgroundColor: theme.marker.shadowCircleColor,
        opacity: 0.25
    }
})


function MapMarker({ price, ids = [], selected = false }) {
    const styles = useTheme(theme => makeStyles(theme, selected), [selected]);
    const theme = useThemeObj();

    return (
        <TouchableOpacity
            style={styles.root}
        >
            <View
                style={styles.priceView}
            >
                <Text
                    style={{
                        ...styles.priceText,
                        color: selected ? theme.marker.selected.textColor : theme.marker.textColor
                    }}
                >{price ? ids.length > 1 ? `от ${splitePrice(price)} Р.` : `${splitePrice(price)} Р.` : 'Цена не указана'}</Text>
            </View>
            <View
                style={styles.circleView}
            />
            <View
                style={styles.shadowView}
            />
        </TouchableOpacity>
    )
}

export { MapMarker };