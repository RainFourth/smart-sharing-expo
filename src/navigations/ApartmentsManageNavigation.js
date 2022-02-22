import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Apartments } from '@sc';

const TabNavigator = createMaterialBottomTabNavigator();

function ApartmentsManageNavigation() {
    return (
        // TODO
        <TabNavigator.Navigator initialRouteName='ApartmentsCreateScreen'>
            <TabNavigator.Screen
                name='ApartmentsCreateScreen'
                component={Apartments.Manage.CreateScreen}
            />
            <TabNavigator.Screen
                name='ApartmentsUpdateScreen'
                component={Apartments.Manage.UpdateScreen}
            />
        </TabNavigator.Navigator>
    )
}

export { ApartmentsManageNavigation };