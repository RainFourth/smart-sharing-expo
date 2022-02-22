import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PersonalAccount, Auth, Apartments } from '@sc';
import { MyApartmentsNavigation, LoginNavigation } from '@n';
import { ProfileNavigation } from './ProfileNavigation';

const StackNavigator = createStackNavigator();

function PersonalAccountNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='PersonalAccountMainScreen'
        >
            <StackNavigator.Screen
                name='PersonalAccountMainScreen'
                options={{ title: 'Мой профиль' }}
                component={PersonalAccount.MainScreen}
            />
            <StackNavigator.Screen
                name='PersonalAccountSignUp'
                options={{ title: 'Регистрация' }}
                component={Auth.SignUpScreen}
            />
            <StackNavigator.Screen
                name='CreateApartmentScreen'
                options={{ title: 'Создание жилья' }}
                component={Apartments.Manage.CreateScreen}
            />
            <StackNavigator.Screen
                name='MyApartmentsNavigation'
                component={MyApartmentsNavigation}
            />
            <StackNavigator.Screen
                name='Profile'
                options={{ title: 'Профиль' }}
                component={ProfileNavigation}
            />
            <StackNavigator.Screen
                name='BookingScreen'
                options={{ title: 'Мои брони' }}
                component={PersonalAccount.BookingScreen}
            />
            <StackNavigator.Screen
                name='Auth'
                options={{ title: 'Вход' }}
                component={LoginNavigation}
            />
        </StackNavigator.Navigator>
    )
}

export { PersonalAccountNavigator };