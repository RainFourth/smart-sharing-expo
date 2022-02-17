import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { API_URL } from "@env";

import * as apartmentsService from "@se/apartmentsService";
import { useTheme } from '@h';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const {
    height: FULL_HEIGHT,
    width: FULL_WIDTH
} = Dimensions.get("window");

const makeStyles = (theme) => StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        height: FULL_HEIGHT,
        width: FULL_WIDTH
    },
    citiesView: {
        marginTop: 75 + STATUS_BAR_HEIGHT,
        marginHorizontal: 25
    },
    question: {
        fontFamily: theme.font.family,
        color: theme.font.color,
        letterSpacing: theme.font.letterSpacing0,
        fontSize: 18,
    },
    cities: {
        marginTop: 35,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    cityView: {
        marginTop: 10,
        width: '47%',
        height: 105,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        overflow: 'hidden'
    },
    cityText: {
        fontFamily: theme.font.familyBold,
        color: theme.font.cityColor,
        letterSpacing: theme.font.letterSpacing0,
        position: 'absolute',
        fontSize: 17,
        paddingTop: 10,
        paddingHorizontal: 10
    }
})

function CitiesScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [cities, setCities] = useState();

    const getCities = async () => {
        const { error, payload, status } = await apartmentsService.getCities();

        if (status > 299) {
            alert(error);
            return;
        }

        setCities(payload);
    }

    useEffect(() => {
        getCities();
    }, []);

    return (
        <>
            <StatusBar
                translucent={true}
                barStyle="dark-content"
                animated={true}
                backgroundColor="rgba( 255, 255, 255, 0 )"
            />
            <View style={styles.root}>
                <View style={styles.citiesView}>
                    <Text style={styles.question}>
                        В каком городе ищете квартиру?
                    </Text>
                    <View style={styles.cities}>
                        {cities?.map(el =>
                            <TouchableOpacity
                                key={el.id}
                                style={styles.cityView}
                                onPress={() => navigation.push('ApartmentsMapScreen', { ...el })}
                            >
                                <Image
                                    key={`${el.id}`}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    source={{
                                        uri: `${API_URL}/${el.image_path}`
                                    }}
                                />
                                <Text style={styles.cityText}>{el.name}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </>
    )
}

export { CitiesScreen };