import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Linking, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Messages } from '@sc';
import { ApartmentsMapNavigation, FavoriteApartmentsNavigation, PersonalAccountNavigator, NotificationsNavigation } from '@n';
import { useTheme, useThemeObj } from '@h';

const AppNavigator = createMaterialBottomTabNavigator();

const makeStyles = (theme, focused) => StyleSheet.create({
    mapView: {
        backgroundColor: theme.colors.mainColor,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        marginTop: -14
    },
    barItemView: {
        height: 50,
        marginTop: -14
    },
    barItemLine: {
        width: 24,
        height: 3,
        backgroundColor: focused ? theme.colors.mainColor : theme.colors.light4,
        borderRadius: 2
    }
})

function AppNavigation({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();


    function handleOpenURL({ url }) {
        if (!/^.*:\/\/oauth/.test(url)) return;

        const params = url
            .match(/\?(.*)/)[1]
            .split("&")
            .reduce((res, el) => {
                const [key, value] = el.split("=");

                res[key] = decodeURIComponent(value);

                return res;
            }, {})

        // TODO change redirect screen
        navigation.navigate("OAuthStatusScreen", params);
    }

    useEffect(() => {
        Linking.addEventListener("url", handleOpenURL);

        return () => Linking.removeEventListener("url", handleOpenURL);
    }, []);

    const MapItem = () => (
        <View style={styles.mapView}>
            <Icon
                name='map-pin'
                size={24}
                color={theme.colors.light4}
            />
        </View>
    )

    const BarItem = ({ iconName, focused }) => {
        const styles = useTheme(theme => makeStyles(theme, focused), [focused]);
        return (<View style={styles.barItemView} >
            <View style={styles.barItemLine} />
            <Icon
                name={iconName}
                size={25}
                color={focused ? theme.colors.mainColor : theme.colors.dark4}
                style={{
                    marginTop: 8
                }}
            />
        </View>)
    }

    return (
        <AppNavigator.Navigator
            barStyle={{
                backgroundColor: theme.colors.light4,
                height: 50
            }}
            initialRouteName='ApartmentsMapNavigation'
            shifting={true}
            labeled={false}
            activeColor='#3417BF'
        >
            <AppNavigator.Screen
                name='Messages'
                options={{
                    tabBarIcon: ({ focused }) =>
                        <BarItem
                            iconName={'message-square'}
                            focused={focused}
                        />
                }}
                component={Messages.MainScreen}
            />
            <AppNavigator.Screen
                name='Notifications'
                options={{
                    tabBarIcon: ({ focused }) =>
                        <BarItem
                            iconName={'bell'}
                            focused={focused}
                        />
                }}
                component={NotificationsNavigation}
            />
            <AppNavigator.Screen
                name='ApartmentsMapNavigation'
                options={{
                    tabBarIcon: () => <MapItem />
                }}
                component={ApartmentsMapNavigation}
            />
            <AppNavigator.Screen
                name='FavoriteApartments'
                options={{
                    tabBarIcon: ({ focused }) =>
                        <BarItem
                            iconName={'list'}
                            focused={focused}
                        />
                }}
                component={FavoriteApartmentsNavigation}
            />
            <AppNavigator.Screen
                name='Profile'
                options={{
                    tabBarIcon: ({ focused }) =>
                        <BarItem
                            iconName={'user'}
                            focused={focused}
                        />
                }}
                component={PersonalAccountNavigator}
            />
            {/* <AppNavigator.Screen
                name='ApartmentsListNavigation'
                options={defaultOptions('Список квартир')}
                component={ApartmentsListNavigation}
            /> */}
        </AppNavigator.Navigator>
    )
}

export { AppNavigation };