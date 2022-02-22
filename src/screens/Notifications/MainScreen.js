import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import { Container, ModalMessage, InfiniteScroll } from '@c';
import { useTheme, useThemeObj } from '@h';
import { AppContext, prettyPrint } from '@u';

import * as notificationsService from '@se/notificationsService';

import { Notification } from './Notification';
import {useAuth} from "@h/useAuth";

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 34
    },
    categories: {
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 10
    },
    category: {
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: theme.colors.mainColor
    },
    categoryText: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        fontSize: 17,
        //color: theme.font.color,
        color: '#fff',
    }
})

function MainScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const modal = useRef(null);
    const scrollRef = useRef(null);

    const { state, dispatch } = useContext(AppContext);
    const { jwt } = useAuth()

    const [firstId, setFirstId] = useState(null);
    const [lastId, setLastId] = useState(null);
    const [filter, setFilter] = useState({});
    const [count, setCount] = useState(0);

    const types = {
        'unread': {
            title: 'Непрочитанные',
            filter: {}
        },
        'read': {
            title: 'Прочитанные',
            filter: {
                readed: true
            }
        },
        'success': {
            title: 'Success',
            filter: {
                types: 'success'
            }
        },
        'danger': {
            title: 'Danger',
            filter: {
                types: 'danger'
            }
        },
        'info': {
            title: 'Info',
            filter: {
                types: 'info'
            }
        },
        'default': {
            title: 'Default',
            filter: {
                types: 'default'
            }
        },
        'warning': {
            title: 'Warning',
            filter: {
                types: 'warning'
            }
        }
    }

    const getNotifications = async (options = {}) => {
        if (lastId === 0) return [false];

        const query = {
            ...filter,
            limit: options?.limit
        };

        if (lastId !== null) {
            query.last_id = lastId;
        } else {
            query.count = true;
        }

        const { status, errors, payload } = await notificationsService.getNotifications(query, jwt);

        if (status >= 299) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') })
            return [false];
        }

        if (payload.count) {
            setCount(payload.count);
            setFirstId(payload.items[0].id);
        }

        let lastItem = payload.items.slice(-1)[0]
        setLastId(lastItem !== undefined ? lastItem.id : 0);

        return [null, payload.items, payload.count || count];
    }

    useEffect(() => {
        if (state.notifications.length > 0 && filter.readed === undefined) {
            let newNotification = state.notifications.filter(el => el.id > firstId)[0];
            setFirstId(newNotification.id);

            scrollRef.current.addToTop(newNotification);
        }
    }, [state.notifications])

    useEffect(() => {
    }, [filter])

    const read = async (id) => {
        const { errors, status } = await notificationsService.readNotification(id, jwt);

        if (status > 299) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') });
            return;
        }
    }

    const updateFilter = (key) => {
        setFilter(types[key].filter);
        setLastId(null);
        setCount(0);
        scrollRef.current.refresh();
    }

    return (
        <Container>
            <View style={styles.root}>
                <Text style={styles.header}>Уведомления</Text>
                <ScrollView
                    horizontal={true}
                    style={styles.categories}
                    showsHorizontalScrollIndicator={false}
                >
                    {Object.keys(types).map((el, i) =>
                        <TouchableOpacity
                            key={`${i}`}
                            style={styles.category}
                            onPress={() => updateFilter(el)}
                        >
                            <Text style={styles.categoryText}>{types[el].title}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
                <InfiniteScroll
                    ref={scrollRef}
                    style={{ paddingTop: 32 }}
                    getPartData={getNotifications}
                    limit={6}
                    renderItem={({ item }) =>
                        <Notification
                            notification={item}
                            readed={filter.readed}
                            onRead={() => read(item.id)}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={item => String(item.id)}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    onRefresh={() => {
                        setLastId(null);
                        setCount(0);
                    }}
                    style={{
                        paddingBottom: 50,
                        height: '100%',
                    }}
                />
            </View>
            <ModalMessage
                modalRef={modal}
                type={'default'}
                cancel={false}
            />
        </Container>
    )
}

export { MainScreen }