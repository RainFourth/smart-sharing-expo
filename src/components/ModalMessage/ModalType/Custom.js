import React, { useState } from 'react';
import {
    Modal, StyleSheet,
    Text, View
} from 'react-native';

import { useTheme, useThemeObj } from '@h';
import { Button } from '@c';

const makeStyles = (theme, buttonDir) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonView: {
        flexDirection: buttonDir,
        width: '100%'
    },
    button: {
        flex: buttonDir === 'row' ? 1 : undefined,
        marginBottom: 0,
        marginTop: 25,
        marginHorizontal: 4
    },
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing4,
        color: theme.font.color,
        fontSize: 22,
        marginTop: 10
    },
});

function Custom({
    modalRef,
    cancel = false, buttonDir = 'row', icon = null,
    onAccept = () => { }, onReject = () => { },
    children = null
}) {
    const styles = useTheme(theme => makeStyles(theme, buttonDir), [buttonDir]);
    const theme = useThemeObj();

    const [_visible, _setVisible] = useState(false);
    const [_headerText, setHeaderText] = useState('');
    const [_showButton, setShowButton] = useState(true);

    const show = ({ header = null, button = true } = {}) => {
        if (header !== null) setHeaderText(header);
        setShowButton(button);

        _setVisible(true)
    }

    const hide = () => {
        _setVisible(false);
    }

    modalRef.current = { show, hide };

    const accept = () => {
        _setVisible(false);
        onAccept();
    }

    const reject = () => {
        _setVisible(false);
        onReject();
    }
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={_visible}
        >
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {icon !== null && icon}
                    {_headerText !== '' && <Text style={styles.header}>{_headerText}</Text>}
                    {children}
                    <View style={{
                        ...styles.buttonView,
                        flexDirection: buttonDir
                    }}>
                        {_showButton &&
                            <Button
                                placeholder='Принять'
                                style={styles.button}
                                onPress={() => accept()}
                            />
                        }
                        {cancel &&
                            <Button
                                placeholder='Отклонить'
                                style={styles.button}
                                buttonStyle={{ backgroundColor: theme.button.backgroundColor.disabled }}
                                textStyle={{ color: theme.button.textColor.disabled }}
                                onPress={() => reject()}
                            />
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export { Custom };