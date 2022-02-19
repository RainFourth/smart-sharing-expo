import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';
import { ApartmentNavigation } from '@n';

const StackNavigator = createStackNavigator();

function MyApartmentsNavigation() {
    return (
        <StackNavigator.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='MyApartmentsScreen'
        >
            <StackNavigator.Screen
                name='MyApartmentsScreen'
                options={{ title: 'Мои квартиры' }}
                component={Apartments.Manage.MyApartmentsScreen}
            />
            <StackNavigator.Screen
                name='ApartmentNavigation'
                component={ApartmentNavigation}
            />
        </StackNavigator.Navigator>
    )
}

export { MyApartmentsNavigation };