import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View,
    Text
} from 'react-native';

import {
    Container, InfiniteScroll,
    Rating, Review,
    ScreenHeader
} from '@c';
import { useTheme, useThemeObj } from '@h';

import * as apartmentsService from '@se/apartmentsService';

const makeStyles = (theme) => StyleSheet.create({
    ratingView: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17,
    },
    line: {
        marginTop: 24,
        height: 1,
        backgroundColor: theme.colors.line
    },
    rootHeadeView: {
        paddingHorizontal: 20,
    }
})

function ReviewsScreen({ route: { params: { id } }, navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [apartment, setApartment] = useState();

    const getApartment = async () => {
        const { error, status, payload } = await apartmentsService.getApartment(id);

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return;
        }

        setApartment(payload);
    }

    const getReviews = async (options) => {
        const { status, error, payload: { items, count } } = await apartmentsService.getReviews(id);

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return [false];
        }

        return [null, items, count]
    }

    useEffect(() => {
        getApartment();
        getReviews();
    }, [])

    return (
        <Container>
            <ScreenHeader
                header='Отзывы'
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.rootHeadeView}>
                {apartment &&
                    <View style={styles.ratingView}>
                        <Text style={styles.ratingText}>{apartment.avg_rating} ({apartment.reviews_count})</Text>
                        <Rating
                            style={{
                                marginLeft: 10
                            }}
                            rating={Math.round(apartment.avg_rating)}
                            color={theme.font.color}
                        />
                    </View>
                }
                <View style={styles.line} />
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                </View>
            </View>
            <InfiniteScroll
                style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20
                }}
                getPartData={getReviews}
                limit={20}
                renderItem={({ item }) =>
                    <Review
                        user={item.user}
                        rating={item.rating}
                        description={item.description}
                        createAt={item.created_at}
                    />
                }
                keyExtractor={({ user: { id } }) => `${id}`}
                getItemCount={data => data.length}
                getItem={(data, i) => data[i]}
            />
        </Container>
    )
}

export { ReviewsScreen };