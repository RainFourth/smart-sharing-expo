import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ApartmentNavigation } from '@n'
import { Notifications } from '@sc';

const StackNavigator = createStackNavigator();

function NotificationsNavigation({ }) {
    return (
        <StackNavigator.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='MainScreen'
        >
            <StackNavigator.Screen
                name='MainScreen'
                options={{ title: 'Уведомления' }}
                component={Notifications.MainScreen}
            />
            <StackNavigator.Screen
                name='ApartmentNavigation'
                component={ApartmentNavigation}
            />
        </StackNavigator.Navigator>
    )
}

export { NotificationsNavigation };