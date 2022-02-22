import React from 'react';

import { Container, InfiniteScroll, ApartmentCard } from '@c';
import * as apartmentsService from '@se/apartmentsService';

function ListScreen({ navigation }) {
    const getApartments = async (options) => {
        const { status, error, payload: { items, count } } = await apartmentsService.getList(options);

        if (status > 299) {
            // TODO replace alert to modal
            alert(error);
            return [false];
        }

        return [null, items, count];
    }

    return (
        <Container>
            <InfiniteScroll
                getPartData={getApartments}
                limit={3}
                renderItem={({ item }) =>
                    <ApartmentCard
                        item={item}
                        onPress={(id) => navigation.push('ApartmentScreen', { id })}
                    />
                }
                keyExtractor={item => String(item.id)}
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
            />
        </Container>
    )
}

export { ListScreen };