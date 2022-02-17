import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import { useTheme } from '@h';
import {
    Container, ScreenHeader, InfiniteScroll
} from '@c';
import { prettyPrint } from '@u';
import { Apartment } from './Apartment';

import * as userService from '@se/userService';

const makeStyles = (theme) => StyleSheet.create({

})

function BookingScreen({
    navigation
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [count, setCount] = useState(null);

    const getRents = async (options = {}) => {
        const { errors, status, payload } = await userService.getRents(options);

        if (status > 299) {
            prettyPrint({ status, errors });
            return [false];
        }

        if (payload.count) {
            setCount(payload.count);
        }

        return [null, payload.items, payload.count || count];
    }

    useEffect(() => {
        getRents();
    }, []);

    return (
        <Container>
            <ScreenHeader
                header='Мои брони'
                onBackPress={() => navigation.goBack()}
            />
            <InfiniteScroll
                style={{ paddingTop: 32 }}
                getPartData={getRents}
                limit={6}
                renderItem={({ item }) =>
                    <Apartment
                        apartment={item}
                    />
                }
                keyExtractor={item => String(item.id)}
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
                onRefresh={() => {
                    setCount(0);
                }}
                style={{
                    height: '100%',
                }}
            />
        </Container>
    )
}

export { BookingScreen };