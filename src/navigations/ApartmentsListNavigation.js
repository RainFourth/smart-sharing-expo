import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';

const StackNavigator = createStackNavigator();

function ApartmentsListNavigation() {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}} initialRouteName='ApartmentsListScreen'>
            <StackNavigator.Screen
                name='ApartmentsListScreen'
                options={{ title: 'Список квартир' }}
                component={Apartments.ListScreen}
            />
            <StackNavigator.Screen
                name='ApartmentScreen'
                options={{ title: 'Квартира' }}
                component={Apartments.ApartmentScreen}
            />
        </StackNavigator.Navigator>
    )
}

export { ApartmentsListNavigation };