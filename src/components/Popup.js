import React, { useEffect, useRef, useState } from 'react';
import {
    Animated, StyleSheet,
    Text, View,
    Dimensions, StatusBar,
    TouchableOpacity
} from 'react-native';

import { useTheme } from '@h';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;
const FULL_HEIGHT = dimensions.height + StatusBar.currentHeight;

const makeStyles = (theme, top) => StyleSheet.create({
    centeredView: {
        width: '100%',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        bottom: top ? undefined : 10,
        top: top ? StatusBar.currentHeight + 10 : undefined
    },
    modalView: {
        width: FULL_WIDTH - 40,
        minHeight: 60,
        backgroundColor: theme.popup.backgroundColor,
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
    textStyle: {
        fontFamily: theme.font.family,
        color: theme.popup.textColor,
        letterSpacing: theme.popup.letterSpacing,
        fontSize: 15,
    },
    closeTextStyle: {
        fontFamily: theme.font.family,
        color: theme.popup.textColor,
        letterSpacing: theme.popup.letterSpacing,
        fontSize: 15,
        textAlign: "center",
        textDecorationLine: 'underline'
    },
    iconView: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function Popup({
    visible = false, top = false,
    text = '', closeText,
    icon, timeout = 2000,
    setVisible = () => { },
}) {
    const styles = useTheme(theme => makeStyles(theme, top), [top]);

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
                {icon &&
                    <View style={styles.iconView}>{icon}</View>
                }
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>{text}</Text>
                </View>
                {closeText &&
                    <View>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Text style={styles.closeTextStyle}>{closeText}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </Animated.View>
        </View>
    )
}

export { Popup };