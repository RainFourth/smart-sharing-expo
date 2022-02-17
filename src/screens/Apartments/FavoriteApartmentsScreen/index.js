import React, { useContext, useMemo, useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import { Container, InfiniteScroll, ApartmentCard, Preloader, ModalMessage } from '@c';
import { AppContext, prettyPrint, Rights } from '@u';
import { Unauthorized } from './Unauthorized';
import { Empty } from './Empty';

import { useTheme } from '@h';
import * as apartmentsService from '@se/apartmentsService';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginTop: StatusBar.currentHeight,
        marginBottom: 50,
        flex: 1
    },
    header: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        marginTop: 50,
        marginHorizontal: 20,
        fontSize: 34
    },
    view: {
        marginBottom: 50
    }
})

function FavoriteApartmentsScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const { user, state, dispatch } = useContext(AppContext);
    // const isAll = useMemo(() => rights.includes(Rights.APARTMENTS_FAVORITES), [rights]);
    const modal = useRef(null);

    const [count, setCount] = useState(null);
    const scrollRef = useRef(null);

    const [loading, setLoading] = useState(true)

    const isFocused = useIsFocused();

    const getFavoriteApartments = async (options) => {
        const { errors, status, payload } = await apartmentsService.getFavoriteApartments(options)

        prettyPrint({status, errors})

        if (status >= 299) {
            modal.current.show({ header: 'Произошла ошибка', description: prettyPrint(errors, 'str') });
            return [false];
        }

        const { count, items } = payload;

        setCount(count);
        setLoading(false);

        let tmp = items.filter(el => Boolean(!state.favorites.find(el1 => el.id === el1.id)))
        dispatch({
            type: 'addFavorites',
            payload: tmp
        })

        return [null, items, count];
    }

    useEffect(() => {
        if (user !== null) setLoading(true);
    }, [isFocused])

    useEffect(() => {
        if (user === null) setLoading(false);
    }, [user]);

    return (
        <Container>
            {isFocused ?
                <View style={styles.root}>
                    <Text style={styles.header}>Избранное</Text>
                    {!user ?
                        <Unauthorized signIn={() => navigation.jumpTo('Profile')} />
                        :
                        count === 0 && !loading &&
                        <Empty onSearch={() => navigation.jumpTo('ApartmentsMapNavigation')} />
                    }
                    {loading &&
                        <Preloader />
                    }
                    {user &&
                        <View style={styles.view}>
                            <InfiniteScroll
                                ref={scrollRef}
                                style={{ paddingTop: 32 }}
                                getPartData={getFavoriteApartments}
                                limit={2}
                                renderItem={({ item }) =>
                                    <ApartmentCard
                                        apartment={item}
                                        in_favorites={true}
                                        onLike={({ id }) => {
                                            setCount(scrollRef.current.del(id))
                                        }}
                                        onMoreDetails={() =>
                                            navigation.push('ApartmentNavigator', {
                                                screen: 'ApartmentScreen',
                                                params: {
                                                    id: item.id
                                                }
                                            })
                                        }
                                    />
                                }
                                keyExtractor={item => String(item.id)}
                                getItemCount={(data) => data.length}
                                getItem={(data, index) => data[index]}
                            />
                        </View>
                    }
                </View>
                :
                <View />
            }
            <ModalMessage
                modalRef={modal}
                type={'default'}
                cancel={false}
            />
        </Container>
    )
}

export { FavoriteApartmentsScreen }