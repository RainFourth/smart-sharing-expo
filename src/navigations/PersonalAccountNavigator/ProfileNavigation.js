import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PersonalAccount } from '@sc';

const StackNavigator = createStackNavigator();

function ProfileNavigation() {
    return (
        <StackNavigator.Navigator
            headerMode='none'
            initialRouteName='ProfileScreen'
        >
            <StackNavigator.Screen
                name='ProfileScreen'
                options={{ title: 'Профиль' }}
                component={PersonalAccount.Profile.ProfileScreen}
            />
            <StackNavigator.Screen
                name='ProfileEditScreen'
                options={{ title: 'Редактирование' }}
                component={PersonalAccount.Profile.EditScreen}
            />
        </StackNavigator.Navigator>
    )
}

export { ProfileNavigation }