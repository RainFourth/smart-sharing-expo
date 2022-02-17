import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';
import { ApartmentNavigation } from '@n';

const StackNavigator = createStackNavigator();

function FavoriteApartmentsNavigation() {
    return (
        <StackNavigator.Navigator
            headerMode='none'
            initialRouteName='FavoriteApartmentsScreen'
        >
            <StackNavigator.Screen
                name='FavoriteApartmentsScreen'
                options={{ title: 'Избранные' }}
                component={Apartments.FavoriteApartmentsScreen}
            />
            <StackNavigator.Screen
                name='ApartmentNavigator'
                component={ApartmentNavigation}
            />
        </StackNavigator.Navigator>
    )
}

export { FavoriteApartmentsNavigation };