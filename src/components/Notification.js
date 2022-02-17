import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Text, StatusBar, Dimensions, TouchableOpacity, Touchable } from 'react-native';

import { useTheme } from '@h';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

const makeStyles = (theme, type) => StyleSheet.create({
    centeredView: {
        width: '100%',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        top: StatusBar.currentHeight + 10
    },
    modalView: {
        width: FULL_WIDTH - 40,
        minHeight: 80,
        backgroundColor: theme.notification.backgroundColors[type || 'default'],
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textView: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        fontFamily: theme.font.familyBold,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.title.letterSpacing,
        fontWeight: 'bold',
        fontSize: 17,
    },
    description: {
        fontFamily: theme.font.family,
        color: theme.notification.textColor,
        letterSpacing: theme.notification.description.letterSpacing,
        fontSize: 15,
    }
})

function Notification({
    notification = {},
    visible = false,
    timeout = 2000,
    setVisible = () => { },
    onPress = () => { }
}) {
    const styles = useTheme((theme) => makeStyles(theme, notification.type), [notification.type]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        if (visible) {
            setDisplay('flex');

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();

            setTimeout(() => {
                setVisible(!visible);
            }, timeout)
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                setDisplay('none');
            });
        }
    }, [visible])

    return (
        <View style={{
            ...styles.centeredView,
            display
        }}>
            <Animated.View style={{
                ...styles.modalView,
                opacity: fadeAnim,
                display
            }}>
                <View style={styles.textView}>
                    {notification.title !== undefined && <Text style={styles.title}>{notification.title}</Text>}
                    {notification.description !== undefined && <Text style={styles.description}>{notification.description}</Text>}
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            width: '100%',
                            height: 30
                        }}
                    >
                        <Text>Открыть</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export { Notification }