import React, { useEffect, useState, useContext } from "react";
import { Dimensions, View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Config from "react-native-config";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/Ionicons";

import { Sub } from "@c";
import { useTheme, useThemeObj } from '@h'
import { splitePrice, AppContext, prettyPrint } from "@u";
import * as apartmentsService from '@se/apartmentsService';

const {
    width: FULL_WIDTH
} = Dimensions.get("window");

const SLIDER_WIDTH = FULL_WIDTH - 40;
const SLIDER_HEIGHT = 180;

const makeStyles = (theme) => StyleSheet.create({
    mainView: {
        marginBottom: 40
    },
    imageView: {
        width: SLIDER_WIDTH,
        height: 180,

        backgroundColor: theme.colors.lighter,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    image: {
        width: SLIDER_WIDTH,
        height: 180,
        alignItems: "center",

        borderRadius: 10
    },
    favorite: {
        position: "absolute",
        right: 20,

        zIndex: 2,
        padding: 10
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 10,
        marginHorizontal: 20
    },
    ratingText: {
        marginLeft: 10,
        color: theme.colors.darker,
        fontSize: 13,
        fontFamily: theme.font.family
    },
    price: {
        marginTop: 5,
        fontSize: 17,
        fontWeight: "500",
        fontFamily: theme.font.familyBold,
    },
    description: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginHorizontal: 20,
        marginTop: 5
    },
    descriptionText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        fontSize: 13
    },
    address: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color
    },
    inactiveDotStyle: {
        backgroundColor: theme.colors.light0,
        flex: 1,
    },
    dotStyle: {
        backgroundColor: theme.colors.medium,
        flex: 1,
    },
    dotContainerStyle: {
        flex: 1
    },
    containerStyle: {
        width: SLIDER_WIDTH,
        marginHorizontal: 20,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: 10,
        height: 5,
        backgroundColor: theme.colors.light0,
        borderRadius: 100
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        width: SLIDER_WIDTH,
    },
    bottomPriceView: {
        flex: 1,
        alignItems: 'flex-start'
    },
    buttonView: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 5
    },
    button: {
        backgroundColor: theme.button.backgroundColor.card,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        alignContent: 'flex-end'
    },
    buttonText: {
        color: theme.button.textColor.card,
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0
    }
});

function ApartmentCard({
    apartment,
    onLike = () => { }, onMoreDetails
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const { state, dispatch } = useContext(AppContext);

    const [activeSlide, setActiveSlide] = useState(0);
    const [inFavorites, setInFavorites] = useState(false);

    useEffect(() => {
        if (apartment.images.length === 0) {
            apartment.images.push({ no_picture: true });
        }
    }, [])

    useEffect(() => {
        setInFavorites(Boolean(state.favorites.find(el => el.id === apartment.id)));
    }, [state])

    const pagination = (activeSlide, entries) => {
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerStyle}
                dotContainerStyle={styles.dotContainerStyle}
                dotStyle={[styles.dotStyle, { width: SLIDER_WIDTH / entries.length }]}
                inactiveDotStyle={[styles.inactiveDotStyle, { width: SLIDER_WIDTH / entries.length }]}
                inactiveDotOpacity={0}
                inactiveDotScale={1}
                animatedDuration={0}
                animatedFriction={5}
                animatedTension={0.5}
                inactiveDotScale={0}
            />
        );
    }

    const _onLike = () => {
        let operation = {};
        let tmp;

        if (inFavorites) {
            operation.type = 'del';

            const { error, status, payload } = apartmentsService.deleteFromFavorites(apartment.apartment_id ? apartment.apartment_id : apartment.id, {});


            if (status >= 299) {
                // TODO replace to maodal
                alert(error);
                return;
            }

            if (state.favorites.length > 0) {
                tmp = state.favorites.filter(el => el.id !== apartment.id)
            }

            dispatch({
                type: 'deleteFavorite',
                payload: tmp
            })

            setInFavorites(false);
        } else {
            operation.type = 'add';

            const { error, status, payload } = apartmentsService.addToFavorites({ apartment_id: apartment.id });

            if (status >= 299) {
                // TODO replace to maodal
                alert(error);
                return;
            }

            dispatch({
                type: 'addFavorites',
                payload: [apartment]
            })

            setInFavorites(true);
        }

        onLike({ ...operation, id: apartment.id });
    }

    return (
        <>
            <View
                style={styles.mainView}
            >
                <View style={styles.imageView}>
                    <Carousel
                        data={apartment.images}
                        itemWidth={SLIDER_WIDTH}
                        itemHeight={SLIDER_HEIGHT}
                        sliderWidth={SLIDER_WIDTH}
                        sliderHeight={SLIDER_HEIGHT}
                        renderItem={({ item }) => {
                            let source;

                            if (item.no_picture) {
                                source = require('@assets/apartmentImage.png');
                            } else {
                                source = {
                                    uri: `${Config.API_URL}/${item.path}`,
                                }
                            }

                            return <Image
                                style={styles.image}
                                source={source}
                            />
                        }}
                        loop={true}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.favorite}
                    onPress={() => _onLike()}>
                    <Icon
                        name={inFavorites ? 'heart' : 'heart-outline'}
                        size={24}
                        color={theme.colors.light4}
                    />
                </TouchableOpacity>
                {pagination(activeSlide, apartment.images)}
                <View style={styles.rating}>
                    <Icon
                        name="ios-star"
                        size={24}
                        color={theme.colors.darker}
                    />
                    <Text style={styles.ratingText}>{apartment.avg_rating} ({apartment.reviews_count})</Text>
                </View>
                <Text style={styles.address}>{apartment.address}</Text>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>{apartment.is_studio ? 'студия' : `${apartment.rooms_count}-комн.кв.`} {apartment.area}{' '}</Text>
                    <Sub
                        base={"м"}
                        exponent={2}
                    />
                    <Text style={styles.descriptionText}>{' '} {apartment.floor} этаж</Text>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.bottomPriceView}>
                        <Text style={styles.price}>{splitePrice(apartment.price)} P./ночь</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onMoreDetails}
                        >
                            <Text style={styles.buttonText}>Подробнее</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

export { ApartmentCard };