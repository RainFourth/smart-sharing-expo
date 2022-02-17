import React, { useContext, useEffect, useState, useRef } from 'react';
import { API_URL } from "@env";
import {
    TouchableOpacity, Text,
    StatusBar, Image,
    Dimensions, ScrollView, View
} from 'react-native';

import FA from 'react-native-vector-icons/FontAwesome';

import { Button, Container, ModalMessage, Input } from '@c';
import { AppContext, fetcher, prettyPrint } from '@u';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

function MainSreen({ navigation }) {
    const { user, setUser, dispatch } = useContext(AppContext);
    const modal = useRef(null);

    async function signOut() {
        await fetcher.get(`${API_URL}/auth/sign-out`);
        await setUser(null);
        dispatch({ type: 'refresh' })
    }

    return (
        <Container>
            <ModalMessage
                modalRef={modal}
                type={'default'}
            // cancel={false}
            />
            <ScrollView>
                <Button
                    placeholder={user ? 'Выйти' : 'Войти'}
                    style={{
                        marginBottom: 10,
                        marginTop: StatusBar.currentHeight + 10
                    }}
                    // TODO replace redirect screen
                    onPress={() => user ? signOut() : navigation.navigate("Login")}
                />
                {/* <Button
                    placeholder={"Тест"}
                    style={{
                        marginBottom: 10,
                    }}
                    // TODO replace redirect screen
                    onPress={() => {
                        modal.current.show({ header: 'Введите код', button: false })
                    }}
                /> */}
                <Button
                    placeholder='Создание жилья'
                    style={{
                        marginBottom: 10
                    }}
                    onPress={() => navigation.push('CreateApartmentScreen')}
                />
                <Button
                    placeholder='Мои квартиры'
                    style={{
                        marginBottom: 10
                    }}
                    onPress={() =>
                        navigation.push('MyApartmentsNavigation', {
                            screen: 'MyApartmentsScreen'
                        })}
                />
                <Button
                    placeholder='Профиль'
                    style={{
                        marginBottom: 10
                    }}
                    onPress={() => navigation.push('Profile')}
                />
                <Button
                    placeholder='Мои аренды'
                    style={{
                        marginBottom: 10
                    }}
                    onPress={() => navigation.push('BookingScreen')}
                />
                {/* <Text>{prettyPrint(user, 'str')}</Text> */}
            </ScrollView>
        </Container>
    )
}

export { MainSreen };