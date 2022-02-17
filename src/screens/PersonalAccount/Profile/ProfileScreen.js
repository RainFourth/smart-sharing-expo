import React, { useState, useEffect, useContext } from 'react';
import {
    Text, ScrollView, View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {
    Container, ScreenHeader,
    InfoMessage, Button,
    Preloader
} from '@c';
import { AppContext, prettyPrint, timestampToNormal } from '@u';

import * as userService from '@se/userService';

import { Info } from './Info';
import { Documents } from './Documents';

function ProfileScreen({ navigation }) {
    const { user, setUser } = useContext(AppContext);

    const [loading, setLoading] = useState(true);

    const getFullUser = async () => {
        const { status, errors, payload } = await userService.getFullUser();

        if (status > 299) {
            console.log(status)
            alert(prettyPrint(errors, 'str'));
            return;
        }

        await setUser(payload);
        setLoading(false);
    }

    useEffect(() => {
        getFullUser();
    }, [])

    return (
        <Container>
            <ScreenHeader
                header={'Профиль'}
                onBackPress={() => {
                    navigation.goBack()
                }}
            />
            {loading ?
                <Preloader />
                :
                <ScrollView>
                    {!user.is_verified &&
                        <InfoMessage
                            data='Пользователь не подтвержден'
                            icon={<Feather
                                name='alert-circle'
                                size={30}
                                color='#fff'
                            />}
                        />
                    }
                    <Info
                        title='ФИО'
                        data={`${user.name} ${user.patronymic} ${user.surname}`}
                    />
                    <Info
                        title='ДАТА РОЖДЕНИЯ'
                        data={timestampToNormal(user.birth_date, 'date')}
                    />
                    <Info
                        title='ГОРОД РЕГИСТРАЦИИ'
                        data={user.registration_city.name}
                    />
                    <Info
                        title='РАБОЧИЙ ГОРОД'
                        data={user.work_city.name}
                    />
                    <Info
                        title='EMAIL'
                        data={user.email}
                        confirmed={user.is_email_confirmed}
                    />
                    <Info
                        title='ТЕЛЕФОН'
                        data={user.phone}
                    />
                    <Info
                        title='РОЛЬ'
                        data={user.role.role}
                    />
                    <Documents
                        title='ДОКУМЕНТЫ'
                        documents={user.documents}
                    />
                    {/* <Text>
                     {prettyPrint(user, 'str')}
                 </Text> */}

                    {/* было закомменчено только у Славы */}
                    <Button
                        placeholder='Редактировать'
                        onPress={() => navigation.push('ProfileEditScreen')}
                    />
                </ScrollView>
            }
        </Container>
    )
}

export { ProfileScreen }