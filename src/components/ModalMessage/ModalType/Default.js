import React, { useEffect, useRef, useState } from 'react';
import {
    Modal, StyleSheet,
    Text, View,
    Dimensions, StatusBar
} from 'react-native';

import { useTheme, useThemeObj } from '@h';
import { Button } from '@c';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;
const FULL_HEIGHT = dimensions.height + StatusBar.currentHeight;

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
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing4,
        color: theme.font.color,
        fontSize: 22,
        marginTop: 10
    },
    description: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color,
        fontSize: 15,
        marginTop: 25
    },
    additionalDescription: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.headerColor,
        fontSize: 13,
        marginTop: 20
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
    }
});

function Default({
    modalRef,
    cancel = false, buttonDir = 'row', icon = null,
    onAccept = () => { }, onReject = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme, buttonDir), [buttonDir]);
    const theme = useThemeObj();

    const [_visible, _setVisible] = useState(false);
    const [_headerText, setHeaderText] = useState('');
    const [_description, setDescription] = useState('');
    const [_additionalDescription, setAdditionalDescription] = useState(null);

    const show = (
        {
            header = 'Вниимание!',
            description = 'Ошибка',
            addDesc = null
        } = {}
    ) => {
        setHeaderText(header);
        setDescription(description);

        if (addDesc !== null) {
            setAdditionalDescription('Описание уведомления в несколько строк.');
        }

        _setVisible(true)
    }

    modalRef.current = { show };

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
                    {_description !== '' && <Text style={styles.description}>{_description}</Text>}
                    {_additionalDescription !== null && <Text style={styles.additionalDescription}>{_additionalDescription}</Text>}
                    <View style={{
                        ...styles.buttonView,
                        flexDirection: buttonDir
                    }}>
                        <Button
                            placeholder='Принять'
                            style={styles.button}
                            onPress={() => accept()}
                        />
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

export { Default }