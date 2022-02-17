import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, Dimensions,
    TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container, ScreenHeader, FreeDates,
    Button, Popup, ModalMessage, Preloader
} from '@c';
import { prettyPrint, datee } from '@u';

import * as apartmentsService from '@se/apartmentsService';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');


function BookingScreen({ navigation, route: { params: { id, price } } }) {
    const modal = useRef(null);

    const [apartment, setApartment] = useState(null);

    const [isFirstDay, setIsFirstDay] = useState(true);

    const [firstDay, setFirstDay] = useState(null);
    const [lastDay, setLastDay] = useState(null);
    const [firstDayLimitation, setFirstDayLimitation] = useState(null);
    const [lastDayLimitation, setLastDayLimitation] = useState(null);

    const [rentDates, setRentDates] = useState({});

    const [picker, setPicker] = useState(false);

    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

    const getApartment = async () => {
        const { status, errors, payload } = await apartmentsService.getApartment(id, 'rent');

        if (status > 299) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') });
            return;
        }

        setApartment({
            price,
            ...payload
        })
    }

    console.log(apartment)

    useEffect(() => {
        getApartment();
    }, [])

    useEffect(() => {
        // prettyPrint(rentDates)
    }, [rentDates])

    console.log(firstDay, lastDay);

    const clear = () => {
        setFirstDay(null);
        setFirstDayLimitation(null);
        setLastDay(null);
        setLastDayLimitation(null);
    }

    const booking = async () => {
        if (!firstDay || !lastDay) {
            setPopupText('Вы не выбрани переиод');
            setPopup(true);
            return;
        }
        if (
            firstDayLimitation &&
            (firstDayLimitation.type === 'start' && firstDayLimitation.timestamp < firstDay ||
                firstDayLimitation.type === 'end' && firstDayLimitation.timestamp > firstDay)
        ) {
            setPopupText('Вы выбрали некорректное время у начала брони');
            setPopup(true);
            return;
        }
        if (
            lastDayLimitation &&
            (lastDayLimitation.type === 'start' && lastDayLimitation.timestamp < lastDay ||
                lastDayLimitation.type === 'end' && lastDayLimitation.timestamp > lastDay)
        ) {
            setPopupText('Вы выбрали некорректное время у конца брони');
            setPopup(true);
            return;
        }
        if (lastDay - firstDay < apartment.minimal_rent_period) {
            setPopupText(`Минимальный срок аренды ${apartment.minimal_rent_period / 60 / 60} часов`);
            setPopup(true);
            return;
        }

        const { status, errors } = await apartmentsService.addRent(id, {
            rent_start_date: firstDay,
            rent_end_date: lastDay
        })

        if (status !== 204) {
            modal.current.show({ header: 'Ошибка!', description: prettyPrint(errors, 'str') });
            return;
        }

        navigation.jumpTo('Profile', {
            screen: 'BookingScreen'
        })

    }

    return (
        <Container>
            <ScreenHeader
                header='Бронирование'
                onBackPress={() => navigation.goBack()}
            />
            {apartment ?
                <ScrollView>
                    <FreeDates
                        apartmentId={id}
                        disabledBusy={true}
                        onDayPress={(day) => {
                            if (isFirstDay) {
                                setFirstDay(datee_.setTimestamp(day.timestamp / 1000, 'UTC').to('MSK').timestamp);

                                if (rentDates[day.dateString] !== undefined && 'timestamp' in rentDates[day.dateString]) {
                                    setFirstDayLimitation({
                                        ...rentDates[day.dateString],
                                        type: rentDates[day.dateString].startingDay ? 'start' : 'end'
                                    });
                                    return;
                                }
                                setFirstDayLimitation(null);
                            } else {
                                setLastDay(datee_.setTimestamp(day.timestamp / 1000, 'UTC').to('MSK').timestamp);

                                if (rentDates[day.dateString] !== undefined && 'timestamp' in rentDates[day.dateString]) {
                                    setLastDayLimitation({
                                        ...rentDates[day.dateString],
                                        type: rentDates[day.dateString].startingDay ? 'start' : 'end'
                                    });
                                    return;
                                }
                                setLastDayLimitation(null);
                            }
                        }}
                        onChangeRentDates={dates => setRentDates(dates)}
                        firstDay={firstDay}
                        lastDay={lastDay}
                        clear={clear}
                        setPopupText={setPopupText}
                        setPopup={setPopup}
                    />
                    <View>
                        <Text style={{
                            fontSize: 20,
                            color: 'red'
                        }}>Минимальный срок аренды: {apartment.minimal_rent_period / 60 / 60} ч.</Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'black'
                            }}
                        >Начало брони:</Text>
                        <View
                            style={{
                                flexWrap: 'wrap',
                                marginTop: 10,
                                height: 30,
                                alignContent: 'space-between'
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                >
                                    {firstDay &&
                                        fromMSK(firstDay).toString('dateTime')
                                    }
                                </Text>
                                {firstDayLimitation &&
                                    <Text style={{
                                        fontSize: 15,
                                        color: 'red'
                                    }}>
                                        {firstDayLimitation.type === 'start' ? 'Максимальное время: ' : 'Минимальное время: '}
                                        {fromMSK(firstDayLimitation.timestamp).toString('time')}
                                    </Text>
                                }
                            </View>
                            {firstDay &&
                                <TouchableOpacity
                                    onPress={() => setPicker(true)}
                                >
                                    <Text>Выбрать время</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <Button
                            placeholder={!firstDay ? 'Выбрать' : 'Изменить'}
                            disabled={isFirstDay}
                            onPress={() => setIsFirstDay(!isFirstDay)}
                            style={{
                                marginBottom: 20
                            }}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'black'
                            }}
                        >Конец брони:</Text>
                        <View
                            style={{
                                flexWrap: 'wrap',
                                marginTop: 10,
                                height: 30,
                                alignContent: 'space-between'
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                >
                                    {lastDay &&
                                        fromMSK(lastDay).toString('dateTime')
                                    }
                                </Text>
                                {lastDayLimitation &&
                                    <Text style={{
                                        fontSize: 15,
                                        color: 'red'
                                    }}>
                                        {lastDayLimitation.type === 'start' ? 'Максимальное время: ' : 'Минимальное время: '}
                                        {fromMSK(lastDayLimitation.timestamp).toString('time')}
                                    </Text>
                                }
                            </View>
                            {lastDay &&
                                <TouchableOpacity
                                    onPress={() => setPicker(true)}
                                >
                                    <Text>Выбрать время</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <Button
                            placeholder={!lastDay ? 'Выбрать' : 'Изменить'}
                            disabled={!isFirstDay}
                            style={{ marginBottom: 10 }}
                            onPress={() => setIsFirstDay(!isFirstDay)}
                        />
                    </View>
                    <Button
                        placeholder='Сбросить'
                        style={{ marginBottom: 10 }}
                        onPress={() => clear()}
                    />
                    <View>
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >Процент предоплаты: {apartment.prepayment_percent}%</Text>
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >Предоплата: {(firstDay && lastDay) ?
                            (Math.ceil(Math.ceil((lastDay - firstDay) / (24 * 60 * 60)) * apartment.price * apartment.prepayment_percent) / 100)
                            :
                            0} Р.
                        </Text>
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >Стоимость: {(firstDay && lastDay) ?
                            (Math.ceil(Math.ceil((lastDay - firstDay) / (24 * 60 * 60)) * apartment.price))
                            :
                            0} Р.
                        </Text>
                    </View>
                    <Button
                        placeholder='Забронировать'
                        style={{ marginBottom: 10 }}
                        onPress={() => booking()}
                        disabled={firstDay === null || lastDay === null || (lastDay - firstDay < apartment.minimal_rent_period)}
                    />
                </ScrollView>
                :
                <Preloader />
            }
            {picker &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={datee_.setTimestamp(isFirstDay ? firstDay : lastDay, 'MSK').to('client').date}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(e, selectedDate) => {
                        if (!selectedDate) {
                            setPicker(false);
                            return
                        }

                        if (isFirstDay) {
                            setFirstDay(datee_.setDate(selectedDate).to('MSK').timestamp);
                        } else {
                            setLastDay(datee_.setDate(selectedDate).to('MSK').timestamp);
                        }
                        setPicker(false);
                    }}
                />
            }
            <Popup
                visible={popup}
                setVisible={setPopup}
                text={popupText}
                icon={<Icon
                    name='alert-circle'
                    size={30}
                    color='#fff'
                />}
            />
            <ModalMessage
                modalRef={modal}
                type={'default'}
                cancel={false}
            />
        </Container>
    )
}

export { BookingScreen };