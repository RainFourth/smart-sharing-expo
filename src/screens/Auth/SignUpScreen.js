import React, {
    useState, useEffect,
    useContext
} from 'react';
import {
    Text, ScrollView,
    View, StyleSheet,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container, Input,
    Button, Popup
} from '@c';
import { AppContext } from '@u';
import { useTheme } from '@h';

import * as apartmentsService from '@se/apartmentsService';
import * as userService from '@se/userService';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    form: {
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center'
    },
    headerText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing1,
        fontSize: 17,
        marginBottom: 20,
        marginTop: 10
    },
    inputHeader: {
        fontFamily: theme.font.family,
        color: theme.font.headerColor,
        letterSpacing: theme.font.letterSpacing2,
        fontSize: 13,
    }
})

function SignUpSreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const { setUser } = useContext(AppContext);

    const [options, setOptions] = useState({});

    const [cities, setCities] = useState([]);

    const [modal, setModal] = useState(false);

    const updateOptions = (key, val) => {
        setOptions(prev => ({
            ...prev,
            [key]: val
        }))
    }

    const getCities = async () => {
        const { error, status, payload } = await apartmentsService.getCities();

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return;
        }

        let tmp = payload.map(el => {
            return {
                label: el.name,
                value: el.id
            }
        })

        setCities(tmp);
    }

    useEffect(() => {
        getCities();
    }, [])

    const singUp = async () => {
        let count = 0;

        for (let key in options) {
            if (options[key] !== undefined) {
                count++;
            }
        }

        if (count < 10) {
            setModal(true)
        } else {
            const { error, status, payload } = await userService.signUp(options);

            if (status > 299) {
                // TODO replace to modal
                alert(error);
                return;
            }

            await setUser(payload);

            navigation.push('PersonalAccountMainScreen')
        }
    }

    return (
        <Container>
            <View style={styles.root}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Регистрация</Text>
                </View>
                <ScrollView style={styles.form}>
                    <Text style={styles.inputHeader}>ФИО</Text>
                    <Input
                        placeholder='Фамилия'
                        type='name'
                        onChange={(text) => updateOptions('surname', text)}
                    />
                    <Input
                        placeholder='Имя'
                        type='name'
                        onChange={(text) => updateOptions('name', text)}
                    />
                    <Input
                        placeholder='Отчество'
                        type='name'
                        onChange={(text) => updateOptions('patronymic', text)}
                    />
                    <Text style={styles.inputHeader}>ДАТА РОЖДЕНИЯ</Text>
                    <Input
                        placeholder='30.01.1901'
                        type='date'
                        keyboardType='number-pad'
                        onChange={(date) => updateOptions('birth_date', date / 1000)}
                    />
                    <Text style={styles.inputHeader}>ПОЧТА</Text>
                    <Input
                        placeholder='example@example.com'
                        type='email'
                        keyboardType='email-address'
                        onChange={(email) => updateOptions('email', email)}
                    />
                    <Text style={styles.inputHeader}>ТЕЛЕФОН</Text>
                    <Input
                        placeholder='+7 (999) 999 99 - 99'
                        type='phone'
                        keyboardType='phone-pad'
                        onChange={(phone) => updateOptions('phone', phone)}
                    />
                    <Text style={styles.inputHeader}>ГОРОД РЕГИСТРАЦИИ (ПО ПАСОРТУ)</Text>
                    <Input
                        mainStyle={{ marginVertical: 15 }}
                        type='dropdown'
                        items={cities}
                        zIndex={300}
                        onChange={(city) => updateOptions('registration_city_id', city)}
                    />
                    <Text style={styles.inputHeader}>РАБОЧИЙ ГОРОД</Text>
                    <Input
                        mainStyle={{ marginVertical: 15 }}
                        type='dropdown'
                        items={cities}
                        zIndex={100}
                        onChange={(city) => updateOptions('work_city_id', city)}
                    />
                    <Text style={styles.inputHeader}>ПАРОЛЬ</Text>
                    <Input
                        placeholder='От 8 символов'
                        type='password'
                        confirmation={true}
                        onChange={(password) => updateOptions('password', password)}
                    />
                    <Text style={styles.inputHeader}>ОТКУДА О НАС УЗНАЛИ?</Text>
                    <Input
                        placeholder='Знакомый'
                        type='name'
                        onChange={(text) => updateOptions('ref', text)}
                    />
                    <Button
                        placeholder='Зарегистрироваться'
                        onPress={singUp}
                    />
                </ScrollView>
            </View>
            <Popup
                visible={modal}
                setVisible={setModal}
                text='Заполните все поля.'
                icon={<Icon
                    name='alert-circle'
                    size={30}
                    color='#fff'
                />}
            />
        </Container>
    )
}

export { SignUpSreen };