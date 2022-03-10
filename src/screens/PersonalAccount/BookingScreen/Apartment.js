import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import Config from "react-native-config";

import { Button } from '@c';
import { useTheme } from '@h';
import { datee, prettyPrint, splitPrice } from '@u';

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');

const {
    width: FULL_WIDTH
} = Dimensions.get("window");

const SLIDER_WIDTH = FULL_WIDTH - 40;
const SLIDER_HEIGHT = 180;

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    imageView: {
        width: SLIDER_WIDTH,
        height: 180,

        backgroundColor: theme.colors.lighter,
        borderRadius: 10,
    },
    image: {
        width: SLIDER_WIDTH,
        height: '100%',
        alignItems: "center",

        borderRadius: 10
    },
    address: {
        marginTop: 5,
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color
    },
    rentDate: {
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color
    },
    leaveDate: {
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: 'red',
    },
    price: {
        fontSize: 15,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color
    },
    createdDate: {
        fontSize: 12,
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing0,
        color: theme.font.color
    },
    status: {
        fontSize: 12,
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
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: 10,
        height: 5,
        backgroundColor: theme.colors.light0,
        borderRadius: 100
    },
})

function Apartment({ apartment = {} }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [activeSlide, setActiveSlide] = useState(0);

    prettyPrint(apartment)

    useEffect(() => {
        if (apartment.apartment.images.length === 0) {
            apartment.apartment.images.push({ no_picture: true });
        }
    }, [])

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

    return (
        <View style={styles.root}>
            <View style={styles.imageView}>
                <Carousel
                    data={apartment.apartment.images}
                    itemWidth={SLIDER_WIDTH}
                    itemHeight={SLIDER_HEIGHT}
                    sliderWidth={SLIDER_WIDTH}
                    sliderHeight={SLIDER_HEIGHT}
                    renderItem={({ item }) => {
                        let source;

                        if (item.no_picture) {
                            source = require('@im/apartmentImage.png');
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
            {pagination(activeSlide, apartment.apartment.images)}
            <Text style={styles.address}>{apartment.apartment.address}</Text>
            <Text style={styles.price}>Стоимость: {splitPrice(apartment.price)} P.</Text>
            <Text style={styles.rentDate}>Аренда: {fromMSK(apartment.schedule[0].start_date).toString()} - {fromMSK(apartment.schedule[0].end_date).toString()}</Text>
            <Text style={styles.leaveDate}>Выезд: {fromMSK(apartment.schedule[1].start_date).toString()} - {fromMSK(apartment.schedule[1].end_date).toString()}</Text>
            <Text style={styles.status}>Статус: {apartment.status}</Text>
            <Text style={styles.createdDate}>Дата создания брони: {fromMSK(apartment.created_at).toString()}</Text>
            <Button
                placeholder={!apartment.has_review ? 'Оставить отзыв' : 'Открыть квартиру'}
                style={{ marginBottom: 10 }}
            />
        </View >
    )
}

export { Apartment };