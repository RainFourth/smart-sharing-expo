import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

import { Container, ScreenHeader, ModalMessage, Preloader, Input } from '@c';
import { AppContext, prettyPrint } from '@u';
import { useTheme } from '@h';

import * as userService from '@se/userService';

import { TextEditor } from './TextEditor';
import { DateEditor } from './DateEditor';
import { EmailEditor } from './EmailEditor';
import { PhoneEditor } from './PhoneEditor';
import { RoleEditor } from './RoleEditor';

const makeStyles = (theme) => StyleSheet.create({
    scrollView: {
        padding: 20
    }
})

function EditScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const { user } = useContext(AppContext);

    const modal = useRef(null);

    const [updateProfile, setUpdateProfile] = useState(null);
    const [draftProfile, setDraftProfile] = useState({});
    const [draft, setDraft] = useState({});

    const getDraft = async () => {
        const { errors, status, payload } = await userService.getDraft();

        if (status > 299 && status !== 404) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') });
            return;
        }

        if (status !== 404)
            setUpdateProfile(payload);
    }

    const updateDraft = (key, value) => {
        if (value === null) {
            setDraftProfile(prev => ({
                ...prev,
                [key]: user[key]
            }))
        } else {
            setDraftProfile(prev => ({
                ...prev,
                [key]: value
            }))
        }

        setDraft(prev => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        getDraft();
        prettyPrint(user);
    }, [])

    useEffect(() => {
        if (user !== null && updateProfile !== null) {

        } else
            setDraftProfile(user);
    }, [user, updateProfile]);

    return (
        <Container>
            <ScreenHeader
                header={'Редактирование'}
                onBackPress={() => {
                    navigation.goBack()
                }}
            />
            {draftProfile &&
                <ScrollView style={styles.scrollView}>
                    <TextEditor
                        title='Фамилия'
                        value={draftProfile.surname && `${draftProfile.surname}`}
                        type='default'
                        onChange={text => updateDraft('surmane', text)}
                    />
                    <TextEditor
                        title='Имя'
                        value={draftProfile.name && `${draftProfile.name}`}
                        type='default'
                        onChange={text => updateDraft('name', text)}
                    />
                    <TextEditor
                        title='Отчество'
                        value={draftProfile.patronymic && `${draftProfile.patronymic}`}
                        type='default'
                        onChange={text => updateDraft('patronymic', text)}
                    />
                    <DateEditor
                        title='Дата рождения'
                        value={draftProfile.birth_date}
                        type='date'
                        onChange={date => updateDraft('birth_date', date / 1000)}
                    />
                    <EmailEditor
                        title='Почта'
                        value={draftProfile.email}
                        type='email'
                        onChange={email => updateDraft('email', email)}
                    />
                    <PhoneEditor
                        title='Номер телефона'
                        value={draftProfile.phone}
                        type='phone'
                        onChange={phone => updateDraft('phone', phone)}
                    />
                    <RoleEditor
                        value={draftProfile.role.role}
                    />
                </ScrollView>
            }
            <ModalMessage
                modalRef={modal}
                type={'default'}
                cancel={false}
            />
        </Container>
    )
}

export { EditScreen };