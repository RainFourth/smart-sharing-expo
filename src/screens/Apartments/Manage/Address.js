import React, {
    useRef, useEffect,
    useContext, useState
} from 'react';
import {
    StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { Marker } from "react-native-maps";

import { MapMarker } from '@c';

import { useTheme, useThemeObj } from '@h';
import { AppContext } from '@u'

const makeStyles = (theme) => StyleSheet.create({
    button: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.button.backgroundColor.picker,
        borderRadius: 22,
        marginTop: 40
    },
    buttonText: {
        color: theme.button.textColor.picker,
        fontFamily: theme.font.family,
        letterSpacing: theme.button.letterSpacing,
        fontSize: 15,
        marginRight: 10
    },
    buttonTextView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mapView: {
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 40,
        height: 180,
        marginHorizontal: 20
    }
})

function Address({
    onPress = () => { }, point = null,
    price
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const { user } = useContext(AppContext);

    const mapRef = useRef(null);

    useEffect(() => {
        if (point) {
            mapRef.current.setCamera({
                zoom: 16,
                center: point
            })
        }
    }, [point])

    return (
        <>
            <View style={{
                ...styles.mapView,
                display: point ? 'flex' : 'none',
            }}>
                <MapView
                    ref={mapRef}
                    style={{
                        flex: 1,
                    }}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    showsPointsOfInterest={false}
                >
                    {point &&
                        <Marker
                            coordinate={point}
                        >
                            <MapMarker
                                price={price}
                                selected={true}
                            />
                        </Marker>
                    }
                </MapView>
            </View>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    height: point ? 40 : 100,
                    marginTop: point ? 20 : 40
                }}
                onPress={onPress}
                activeOpacity={0.5}
            >
                <View style={styles.buttonTextView}>
                    <Text style={styles.buttonText}>{point ? 'Изменить дом на карте' : 'Выбрать дом на карте'}</Text>
                    <Feather
                        name='map-pin'
                        size={24}
                        color={theme.button.textColor.picker}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

export { Address };