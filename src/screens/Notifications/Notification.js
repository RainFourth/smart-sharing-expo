import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '@h';
import { prettyPrint, datee } from '@u';

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');

const makeStyles = (theme, type, readed) => StyleSheet.create({
    notification: {
        backgroundColor: theme.notification.backgroundColors[type || 'default'],
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: readed ? 3 : 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        opacity: readed ? 0.5 : undefined
    },
    notificationHeader: {
        fontFamily: theme.font.familyBold,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.title.letterSpacing,
        fontSize: 20
    },
    notificationDescription: {
        marginTop: 5,
        fontFamily: theme.font.family,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.description.letterSpacing,
        fontSize: 15
    },
    notificationCreateAt: {
        marginTop: 5,
        fontFamily: theme.font.family,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.description.letterSpacing,
        fontSize: 12
    },
    line: {
        height: 1,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    bottomView: {
        alignItems: 'flex-end',
        marginBottom: 5
    },
    readedView: {
    },
    readedText: {
        marginTop: 5,
        fontFamily: theme.font.family,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.description.letterSpacing,
        fontSize: 15
    }
})

function Notification({
    notification = {},
    readed = false,
    onRead = () => { },
    navigation = {},
    onPress = () => { }
}) {
    const [_readed, setReaded] = useState(false);

    const styles = useTheme(theme => makeStyles(theme, notification.type, _readed), [notification.type, _readed]);

    const read = () => {
        setReaded(true);
        onRead(notification);
    }

    return (
        <View style={styles.notification}>
            <Text style={styles.notificationHeader}>{notification.title} [{notification.type}]</Text>
            <Text style={styles.notificationDescription}>{notification.description}</Text>
            <Text style={styles.notificationCreateAt}>{fromMSK(notification.created_at).toString()}</Text>
            {notification?.extra &&
                <TouchableOpacity
                    onPress={() => navigation.push('ApartmentNavigation', {
                        screen: 'ApartmentScreen',
                        params: {
                            id: notification.extra.apartment.id
                        }
                    })}
                >
                    <Text>Открыть апартаменты</Text>
                </TouchableOpacity>
            }
            {!readed && !_readed &&
                <>
                    <View style={styles.line} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            style={styles.readed}
                            onPress={() => {
                                if (!readed && !_readed) read();
                            }}
                        >
                            <Text style={styles.readedText}>Отметить как прочитанное</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View>
    )
}

export { Notification };