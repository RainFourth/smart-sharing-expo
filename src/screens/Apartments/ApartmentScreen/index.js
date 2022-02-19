import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-native-snap-carousel';
import { API_URL } from "@env";
import {
    StyleSheet, Dimensions,
    View, Text,
    Image, TouchableOpacity,
    StatusBar, ScrollView,
    BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {
    Container, Sub,
    Facility, DropDownListHeader,
    Review, MoreDetails,
    Button, FreeDates
} from '@c'
import {
    splitePrice, AppContext,
    Rights,
    prettyPrint,
} from '@u';
import { useTheme, useThemeObj } from '@h';

import * as apartmentsService from '@se/apartmentsService';

const {
    width: FULL_WIDTH
} = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const makeStyles = (theme) => StyleSheet.create({
    imageView: {
        width: FULL_WIDTH,
        height: 324,

        backgroundColor: theme.carousel.backgroundColor,
    },
    image: {
        width: FULL_WIDTH,
        height: 324,
        alignItems: "center",
    },
    favorite: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
        right: 10,

        zIndex: 2,
        padding: 10
    },
    back: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT,
        left: 10,
        zIndex: 2,
        padding: 10
    },
    imageIndexView: {
        position: 'absolute',
        zIndex: 2,
        bottom: 10,
        right: 17,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: theme.carousel.index.backgroundColor,
        borderRadius: 8
    },
    imageIndexText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.carousel.index.letterSpacing,
        color: theme.carousel.index.textColor,
        fontSize: 10,
        fontWeight: '600',
    },
    descriptionRootView: {
        margin: 20,
    },
    priceAndRatingView: {
        flexDirection: 'row',
    },
    priceAndRatingFlexView: {
        maxHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'space-between'
    },
    priceText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 17,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontFamily: theme.font.family,
        color: theme.font.ratingColor,
        letterSpacing: theme.font.letterSpacing0,
        marginLeft: 10,
        fontSize: 13,
    },
    addressView: {
        marginTop: 20,
    },
    addressText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 15,
    },
    houseDescription: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 16
    },
    houseDescriptionText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 13
    },
    descriptionView: {
        marginTop: 40,
    },
    descriptionText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 15
    },
    line: {
        marginTop: 24,
        height: 1,
        backgroundColor: theme.colors.line
    },
    facilities: {
        marginTop: 48
    },
    facilitiesHeaderText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing1,
        fontSize: 17,
    },
    facilitiesText: {
        marginTop: 16
    },
    emptyReviews: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        marginTop: 20,
        fontSize: 15
    },
    facilityText: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 15,
        marginTop: 2
    }
})

// function ApartmentSreen({ route: { params: { id, full = false } }, navigation }) {
function ApartmentSreen({ route, navigation }) {
    const { id, full = false } = route.params;
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const { user } = useContext(AppContext);

    const [apartment, setApartment] = useState(null);

    const [activeSlide, setActiveSlide] = useState(0);

    const [fullDescription, setFullDescription] = useState(false);
    const [fullFacilities, setFullFacilities] = useState(false);
    const [reviewsOpen, setReviewsOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false);

    const getReviews = async () => {
        const { error, status, payload } = await apartmentsService.getReviews(id);

        if (status > 299) {
            // TODO replace to modal
            alert(error);
        }

        return { error, status, payload }
    }

    const getApartment = async () => {
        const { error, status, payload } = await apartmentsService.getApartment(id, full ? 'full' : 'user');

        if (status > 299) {
            // TODO replace modal
            alert(error);
            return;
        }

        if (payload.images.length === 0) {
            payload.images.push({ no_picture: true })
        }

        payload.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend dictum mi ut lacinia. Morbi laoreet mattis volutpat. In vitae felis at nunc blandit luctus. Etiam ut semper enim. Etiam bibendum mi risus, in tristique metus tristique at. Integer eget nibh finibus, congue nibh vel, rutrum dui. Morbi laoreet dictum nisi, nec volutpat nisi blandit vitae. Mauris efficitur interdum justo, et aliquet ligula fringilla ac. Nunc a est eget enim ullamcorper auctor. Nunc vehicula leo ut mi porttitor, vitae feugiat lectus feugiat. Cras placerat enim lacus. Cras vulputate mauris ipsum, id euismod diam blandit ac. Praesent ultrices blandit dui. Aenean lobortis eget nisi in imperdiet.'

        if (payload.reviews_count > 0) {
            const reviews = await getReviews();

            if (!reviews.error) {
                payload.reviews = reviews.payload.items;
            }
        }

        setApartment(payload);
    }

    useEffect(() => {
        getApartment();

        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [])

    return (
        <Container>
            {apartment &&
                <ScrollView>
                    <View style={styles.imageView}>
                        <Carousel
                            data={apartment.images}
                            itemWidth={FULL_WIDTH}
                            sliderWidth={FULL_WIDTH}
                            itemHeight={324}
                            sliderHeight={324}
                            renderItem={({ item }) => {
                                let source;

                                if (item.no_picture) {
                                    source = require('@im/apartmentImage.png');
                                } else {
                                    source = {
                                        uri: `${API_URL}/${item.path}`,
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
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => navigation.goBack()}
                        >
                            <Feather
                                name='arrow-left'
                                size={24}
                                color={theme.button.textColor.main}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.favorite}
                            onPress={() => { }}
                        >
                            <Ionicons
                                name={apartment.in_favorites ? 'heart' : 'heart-outline'}
                                size={24}
                                color={theme.button.textColor.main}
                            />
                        </TouchableOpacity>
                        <View style={styles.imageIndexView}>
                            <Text style={styles.imageIndexText}>{activeSlide + 1}/{apartment.images.length}</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionRootView}>
                        <View style={styles.priceAndRatingView}>
                            <View style={styles.priceAndRatingFlexView}>
                                <Text style={styles.priceText}>{splitePrice(apartment.price)} Р./ночь</Text>
                                <View style={styles.rating}>
                                    <Ionicons
                                        name="ios-star"
                                        size={24}
                                        color="#3417BF"
                                    />
                                    <Text style={styles.ratingText}>{apartment.avg_rating} ({apartment.reviews_count})</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.addressView}>
                            <Text style={styles.addressText}>{apartment.address}</Text>
                        </View>
                        <View style={styles.houseDescription}>
                            <Text style={styles.houseDescriptionText}>{apartment.is_studio ? 'студия' : `${apartment.rooms_count}-комн.кв.`} {apartment.area}{' '}</Text>
                            <Sub
                                base={"м"}
                                exponent={2} />
                            <Text style={styles.houseDescriptionText}>{' '} {apartment.floor} этаж</Text>
                        </View>
                        <View style={styles.descriptionView}>
                            <Text
                                style={styles.descriptionText}
                                numberOfLines={fullDescription ? 0 : 6}
                                ellipsizeMode='tail'
                            >{apartment.description}</Text>
                            <MoreDetails
                                text='Подробнее'
                                icon={
                                    <Feather
                                        name={fullDescription ? 'chevron-left' : 'chevron-right'}
                                        size={20}
                                    />
                                }
                                onPress={() => setFullDescription(!fullDescription)}
                            />
                        </View>
                        <View style={styles.facilities} >
                            <Text style={styles.facilitiesHeaderText}>Удобства</Text>
                            <View style={styles.facilitiesText}>
                                {apartment.checklist.map((el, i) => {
                                    if (i > 3 && !fullFacilities) return;
                                    else
                                        return <Text
                                            key={`${el.id}`}
                                            style={styles.facilityText}
                                        >{el.name}</Text>
                                }
                                )}
                                <MoreDetails
                                    text='Подробнее'
                                    icon={
                                        <Feather
                                            name={fullFacilities ? 'chevron-left' : 'chevron-right'}
                                            size={20}
                                        />
                                    }
                                    onPress={() => setFullFacilities(!fullFacilities)}
                                />
                            </View>
                            {apartment.with_animals || apartment.with_childs &&
                                < View style={styles.line} />
                            }
                            <View style={{ flexDirection: 'row' }}>
                                {apartment.with_animals &&
                                    <Facility
                                        name='Можно с животными'
                                        icon={
                                            <FontAwesome
                                                name='dog'
                                                size={24}
                                            />
                                        }
                                    />
                                }
                                {apartment.with_childs &&
                                    <Facility
                                        name='Можно с детьми'
                                        icon={
                                            <FontAwesome
                                                name='baby'
                                                size={24}
                                            />
                                        }
                                    />
                                }
                            </View>
                            {apartment.with_animals || apartment.with_childs &&
                                < View style={styles.line} />
                            }
                        </View>
                        <View>
                            <DropDownListHeader
                                name='Отзывы'
                                open={reviewsOpen}
                                setOpen={setReviewsOpen}
                            />
                            {reviewsOpen &&
                                (apartment.reviews_count > 0 ?
                                    apartment.reviews.map((el, i) => (
                                        i < 2 &&
                                        <Review
                                            key={`${i}`}
                                            user={el.user}
                                            description={el.description}
                                            rating={el.rating}
                                            createAt={el.created_at}
                                        />
                                    ))
                                    :
                                    <Text style={styles.emptyReviews}>У этой квартиры пока нет отзывов</Text>)
                            }
                            {apartment.reviews_count > 2 && reviewsOpen &&
                                <MoreDetails
                                    text={`Показать все отзывы (${apartment.reviews_count})`}
                                    onPress={() => navigation.push('ReviewsScreen', { id })}
                                />
                            }
                        </View>
                        <View>
                            <DropDownListHeader
                                name='Свободные даты'
                                open={dateOpen}
                                setOpen={setDateOpen}
                            />
                            {dateOpen &&
                                (user && user.rights.indexOf(Rights.APARTMENTS_RENT) > -1 ?
                                    <FreeDates
                                        apartmentId={id}
                                        displayInfo={true}
                                    />
                                    :
                                    <Text style={styles.emptyReviews}>Идите нахуй, у вас нет прав</Text>
                                )
                            }
                        </View>
                    </View>
                    <Button
                        placeholder='Забронировать'
                        style={{
                            marginBottom: 10
                        }}
                        onPress={() => navigation.push('BookingScreen', { id, price: apartment.price })}
                    />
                    {full &&
                        <Button
                            placeholder='Редактировать'
                            style={{
                                marginBottom: 10
                            }}
                            onPress={() => navigation.push('EditScreen', { id })}
                        />
                    }
                </ScrollView>
            }
        </Container>
    )
}

export { ApartmentSreen };