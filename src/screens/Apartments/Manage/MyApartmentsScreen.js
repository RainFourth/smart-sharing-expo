import React, {
    useEffect, useCallback,
    useState
} from 'react';
import { StatusBar } from 'react-native';

import {
    Container, InfiniteScroll,
    ApartmentCard, ScreenHeader
} from '@c';
import { prettyPrint, splitPrice } from '@u';
import * as apartmentsService from '@se/apartmentsService';

function MyApartmentsScreen({ navigation }) {

    const getPartData = async _options => {
        prettyPrint(_options)
        const { status, errors, payload } = await apartmentsService.getMyApartments({
            ..._options
        });

        if (status > 299) {
            // TODO replace to modal
            prettyPrint(errors)

            return [false];
        }

        const { items, count } = payload;

        for (const item of items) {
            item.price = splitPrice(item.price);
        }

        return [null, items, count];
    }

    return (
        <Container>
            <ScreenHeader
                header={'Мои квартиры'}
                onBackPress={() => {
                    navigation.goBack()
                }}
            />
            <InfiniteScroll
                style={{
                    paddingTop: StatusBar.currentHeight
                }}
                getPartData={getPartData}
                limit={3}
                renderItem={({ item }) =>
                    <ApartmentCard
                        apartment={item}
                        onMoreDetails={() =>
                            navigation.push('ApartmentNavigation', {
                                screen: 'ApartmentScreen',
                                params: {
                                    id: item.id,
                                    full: true
                                }
                            })
                        }
                    />
                }
                keyExtractor={({ id }) => `${id}`}
                getItemCount={data => data.length}
                getItem={(data, i) => data[i]}
            />
        </Container>
    )
}

export { MyApartmentsScreen };