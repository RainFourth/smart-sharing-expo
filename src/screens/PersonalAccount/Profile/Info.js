import React from 'react';
import {
    View, Text,
    StyleSheet, Dimensions
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from '@h';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20,
        marginTop: 30
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: theme.font.familyBold,
        color: theme.font.headerColor,
        letterSpacing: theme.font.letterSpacing2,
        fontSize: 13,
    },
    data: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        marginTop: 15,
        fontSize: 17,
        width: FULL_WIDTH - 40
    }
})

function Info({
    title = '', data = '',
    confirmed = null
}) {
    const styles = useTheme(theme => makeStyles(theme), [])

    return (
        <View style={styles.root}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{title}</Text>
                {confirmed !== null &&
                    <Feather
                        name={confirmed ? 'check' : 'x'}
                        color={confirmed ? 'green' : 'red'}
                        size={18}
                        style={{
                            marginLeft: 10
                        }}
                    />
                }
            </View>
            <Text style={styles.data}>{data}</Text>
        </View>
    )
}

export { Info };