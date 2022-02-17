import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';

const StackNavigator = createStackNavigator();

function ApartmentsListNavigation() {
    return (
        <StackNavigator.Navigator headerMode='none' initialRouteName='ApartmentsListSreen'>
            <StackNavigator.Screen
                name='ApartmentsListSreen'
                options={{ title: 'Список квартир' }}
                component={Apartments.ListSreen}
            />
            <StackNavigator.Screen
                name='ApartmentSreen'
                options={{ title: 'Квартира' }}
                component={Apartments.ApartmentSreen}
            />
        </StackNavigator.Navigator>
    )
}

export { ApartmentsListNavigation };