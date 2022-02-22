import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Apartments } from '@sc';

const StackNavigator = createStackNavigator();

function ApartmentNavigation() {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}} initialRouteName='ApartmentScreen'>
            <StackNavigator.Screen
                name='ApartmentScreen'
                options={{ title: 'Апаратаменты' }}
                component={Apartments.ApartmentScreen}
            />
            <StackNavigator.Screen
                name='ReviewsScreen'
                options={{ title: 'Отзывы' }}
                component={Apartments.ReviewsScreen}
            />
            <StackNavigator.Screen
                name='BookingScreen'
                options={{ title: 'Бронирование' }}
                component={Apartments.BookingScreen}
            />
            <StackNavigator.Screen
                name='EditScreen'
                options={{ title: 'Редактирование апартоментов' }}
                component={Apartments.Manage.EditApartmentScreen}
            />
        </StackNavigator.Navigator>
    )
}

export { ApartmentNavigation };