import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Auth } from '@sc';

const StackNavigator = createStackNavigator();

function LoginNavigation() {
    return (
        <StackNavigator.Navigator
            headerMode='none'
            initialRouteName='MethodScreen'
        >
            <StackNavigator.Screen
                name='MethodScreen'
                options={{ title: 'Способ входа' }}
                component={Auth.MethodSelectionScreen}
            />
            <StackNavigator.Screen
                name='SignInScreen'
                options={{ title: 'Вход' }}
                component={Auth.SignInSreen}
            />
            <StackNavigator.Screen
                name='SignUpScreen'
                options={{ title: 'Регистрация' }}
                component={Auth.SignUpSreen}
            />
        </StackNavigator.Navigator>
    )
}

export { LoginNavigation };