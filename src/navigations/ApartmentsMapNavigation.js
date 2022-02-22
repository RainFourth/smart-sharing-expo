import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';
import { ApartmentNavigation } from '@n';

const StackNavigator = createStackNavigator();

function ApartmentsMapNavigation() {
    return (
        <StackNavigator.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='ApartmentsCitiesScreen'
        >
            <StackNavigator.Screen
                name='ApartmentsCitiesScreen'
                options={{ title: 'Список городов' }}
                component={Apartments.CitiesScreen}
            />
            <StackNavigator.Screen
                name='ApartmentsMapScreen'
                options={{ title: 'Карта' }}
                component={Apartments.MapScreen}
            />
            <StackNavigator.Screen
                name='ApartmentNavigator'
                component={ApartmentNavigation}
            />
        </StackNavigator.Navigator>
    )
}

export { ApartmentsMapNavigation };