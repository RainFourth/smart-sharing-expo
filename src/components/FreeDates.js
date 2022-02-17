import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Feather from 'react-native-vector-icons/Feather';

import { datee, dateToCalendareDateString, prettyPrint } from '@u';
import { useTheme, useThemeObj } from '@h';
import { ModalMessage } from '@c';

import * as apartmentsService from '@se/apartmentsService';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};

LocaleConfig.defaultLocale = 'ru';

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');

const makeStyles = (theme) => StyleSheet.create({
    calendarStyle: {
        marginHorizontal: 5,
        marginTop: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    info: {
        marginTop: 10,
        marginHorizontal: 10
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoItemColor: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    infoItemText: {
        fontFamily: theme.font.family,
        fontSize: 17,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        marginLeft: 5
    }
})

function FreeDates({
    apartmentId,
    displayInfo = false,
    disabledBusy = false,
    onDayPress = () => { },
    selectedDay = null,
    firstDay = null,
    lastDay = null,
    clear = () => { },
    onChangeRentDates = () => { },
    setPopupText = () => { },
    setPopup = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const modal = useRef(null);

    const [rents, setRents] = useState({});

    const [today, setToday] = useState(dateToCalendareDateString());

    const [periods, setPeriods] = useState({});

    const getRents = async (startDate = null) => {
        let date = datee_.setDate(new Date()).timestamp;

        if (startDate / 1000 > date && startDate !== null) {
            date = Math.floor(startDate / 1000);
        }

        const { status, errors, payload } = await apartmentsService.getApartmentRentsPeriod(
            apartmentId,
            date,
            date + (31 * 24 * 60 * 60)
        );

        if (status > 299) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') });
            return;
        }

        let tmp = {}

        payload.map(el => {
            let start = fromMSK(el.start_date).toString('calendar');
            let end = fromMSK(el.end_date).toString('calendar');

            if (start === end) {
                tmp[start] = { startingDay: true, color: theme.calendar.busy, endingDay: true }
                return;
            }

            let period = (fromMSK(el.end_date) - fromMSK(el.start_date)) / 24 / 60 / 60;

            if (period < 1) {
                tmp[start] = { startingDay: true, color: theme.calendar.partlyBusy }
                tmp[end] = { color: theme.calendar.partlyBusy, endingDay: true }
                return;
            }

            let timestamp = el.start_date;

            while (timestamp < el.end_date) {
                tmp[fromMSK(timestamp).toString('calendar')] = { color: theme.calendar.busy, disableTouchEvent: disabledBusy }

                timestamp += 24 * 60 * 60;
            }

            let startHours = fromMSK(el.start_date).date.getHours();
            let endHours = fromMSK(el.end_date).date.getHours();

            if (startHours !== 0 || startHours !== 23)
                tmp[start] = { startingDay: true, color: theme.calendar.partlyBusy, timestamp: el.start_date };
            else
                tmp[start] = { startingDay: true, color: theme.calendar.busy };

            if (endHours !== 23 || endHours !== 0)
                tmp[end] = { endingDay: true, color: theme.calendar.partlyBusy, timestamp: el.end_date };
            else
                tmp[end] = { endingDay: true, color: theme.calendar.busy };
        })

        for (const el of Object.keys(tmp)) {
            if (el === today) {
                tmp[el] = {
                    ...tmp[el],
                    color: theme.calendar.today
                }
            }
        }

        setRents(prev => ({
            ...prev,
            ...tmp
        }));
    }

    useEffect(() => {
        getRents()
    }, [])

    useEffect(() => {
        setPeriods(prev => ({
            ...prev,
            [today]: {
                color: theme.calendar.today,
                startingDay: true,
                endingDay: true
            },
            ...rents
        }))
        onChangeRentDates(rents);
    }, [rents])

    useEffect(() => {
        if (firstDay !== null) {
            let day = fromMSK(firstDay).toString('calendar');
            let style = {}

            if (periods[day]) {
                style = {
                    ...periods[day],
                    color: 'green'
                }
            } else {
                style = {
                    endingDay: true,
                    startingDay: true,
                    color: 'green'
                }
            }

            setPeriods({
                ...rents,
                [today]: {
                    color: theme.calendar.today,
                    startingDay: true,
                    endingDay: true
                },
                [day]: style
            })
        }
        if (firstDay !== null && lastDay !== null) {
            if (firstDay > lastDay) {
                setPopupText('Дата окончания брони не может быть меньше даты начала брони');
                setPopup(true);
                return;
            }

            if (lastDay - firstDay < 24 * 60 * 60) {
                setPeriods({
                    ...rents,
                    [today]: {
                        color: theme.calendar.today,
                        startingDay: true,
                        endingDay: true
                    },
                    [fromMSK(firstDay).toString('calendar')]: {
                        endingDay: true,
                        startingDay: true,
                        color: 'green'
                    }
                })
                return;
            }

            let timestamp = firstDay;
            let prevDay = fromMSK(timestamp).toString('calendar');
            let tmp = {}

            while (timestamp < lastDay) {
                let day = fromMSK(timestamp).toString('calendar');

                if (rents[day]) {
                    if (
                        rents[day].color === theme.calendar.busy ||
                        (
                            rents[prevDay] &&
                            rents[prevDay].color === theme.calendar.partlyBusy &&
                            rents[day].color === theme.calendar.partlyBusy &&
                            rents[prevDay].startingDay === true &&
                            rents[day].endingDay === true
                        )
                    ) {
                        setPopupText('Вы не можете выбрать данный период')
                        setPopup(true);
                        clear();
                        return;
                    }
                }

                tmp[day] = { color: 'green' }

                prevDay = day;
                timestamp += 24 * 60 * 60;
            }

            let start = fromMSK(firstDay).toString('calendar');
            let end = fromMSK(lastDay).toString('calendar');

            if (rents[end]) {
                if (
                    rents[end].color === theme.calendar.busy ||
                    (
                        rents[prevDay] &&
                        rents[prevDay].color === theme.calendar.partlyBusy &&
                        rents[end].color === theme.calendar.partlyBusy &&
                        rents[prevDay].startingDay === true &&
                        rents[end].endingDay === true
                    )
                ) {
                    setPopupText('Вы не можете выбрать данный период')
                    setPopup(true);
                    clear();
                    return;
                }
            }

            if (rents[start] && rents[start].color === theme.calendar.partlyBusy) {
                tmp[start] = {
                    timestamp: rents[start]?.timestamp,
                    color: 'green',
                    endingDay: false,
                    startingDay: false
                }
            } else {
                tmp[start] = {
                    startingDay: true,
                    color: 'green'
                }
            }
            if (rents[end] && rents[end].color === theme.calendar.partlyBusy) {
                tmp[end] = {
                    ...rents[end],
                    color: 'green',
                    endingDay: false,
                    startingDay: false
                }
            } else {
                tmp[end] = {
                    endingDay: true,
                    color: 'green'
                }
            }

            setPeriods({
                ...rents,
                [today]: {
                    color: theme.calendar.today,
                    startingDay: true,
                    endingDay: true
                },
                ...tmp
            })
        }
        if (firstDay === null && lastDay === null) {
            setPeriods({
                ...rents,
                [today]: {
                    color: theme.calendar.today,
                    startingDay: true,
                    endingDay: true
                }
            })
        }
    }, [firstDay, lastDay]);

    return (
        <>
            <View>
                <Calendar
                    minDate={today}
                    markingType={'period'}
                    markedDates={periods}
                    onDayPress={onDayPress}
                    theme={{
                        textMonthFontFamily: theme.font.familyBold,
                        textDayFontFamily: theme.font.family,
                        textDayHeaderFontFamily: theme.font.family,
                        dayTextColor: theme.font.color
                    }}
                    renderArrow={(dir) => (<Feather
                        name={`chevron-${dir}`}
                        size={30}
                        color={theme.font.color}
                    />)}
                    onMonthChange={(month) => getRents(month.timestamp)}
                    style={styles.calendarStyle}
                />
                {displayInfo &&
                    <View style={styles.info}>
                        <View style={styles.infoItem} >
                            <View
                                style={{
                                    ...styles.infoItemColor,
                                    backgroundColor: theme.calendar.today
                                }}
                            />
                            <Text style={styles.infoItemText}>- сегодня</Text>
                        </View>
                        <View style={styles.infoItem} >
                            <View
                                style={{
                                    ...styles.infoItemColor,
                                    backgroundColor: theme.calendar.busy
                                }}
                            />
                            <Text style={styles.infoItemText}>- занято</Text>
                        </View>
                        <View style={styles.infoItem} >
                            <View
                                style={{
                                    ...styles.infoItemColor,
                                    backgroundColor: theme.calendar.partlyBusy
                                }}
                            />
                            <Text style={styles.infoItemText}>- частично занято</Text>
                        </View>
                    </View>
                }
            </View >
            <ModalMessage
                modalRef={modal}
                type={'default'}
                cancel={false}
            />
        </>
    )
}

export { FreeDates }