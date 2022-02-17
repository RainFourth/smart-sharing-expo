import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Text } from 'react-native';
import { Config } from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    separatorLine: {
        height: 1,
        flex: 1,
        backgroundColor: theme.font.separatorColor
    },
    separatorText: {
        color: theme.font.separatorColor,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 13,
        marginHorizontal: 13
    },
    oauthView: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    logoView: {
        height: 40,
        width: 40,
        borderColor: theme.font.separatorColor,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }
})

function OAuthComponent({ redirectScreen }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const deepLink = encodeURIComponent(`flatsh://oauth/status?redirectScreen=${redirectScreen}`);

    const googleOauthURL = `${Config.API_URL}/oauth/google?action=enter&redirect_uri=${deepLink}&sign=${Config.OAUTH_GOOGLE_SIGN}`;
    const facebookOauthURL = `${Config.API_URL}/oauth/facebook?action=enter&redirect_uri=${deepLink}&sign=${Config.OAUTH_FACEBOOK_SIGN}`;

    return (
        <View style={styles.container}>
            <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>или</Text>
                <View style={styles.separatorLine} />
            </View>
            <View style={styles.oauthView}>
                <TouchableOpacity
                    onPress={() => Linking.openURL(googleOauthURL)}
                    style={styles.logoView}
                >
                    <Icon
                        name='logo-google'
                        size={24}
                        color={theme.colors.dark0}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL(facebookOauthURL)}
                    style={styles.logoView}
                >
                    <FA
                        name='facebook-f'
                        size={24}
                        color={theme.colors.dark0}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { OAuthComponent };