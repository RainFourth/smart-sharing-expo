import React, { useState } from 'react';
import {
    View, Text,
    StyleSheet, Dimensions
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useTheme, useThemeObj } from '@h';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

const makeStyles = (theme) => StyleSheet.create({
    contentView: {
        marginHorizontal: 20
    },
    ratingView: {
        marginVertical: 40
    },
    ratingHeaderText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13
    },
    trackStyle: {
        backgroundColor: theme.input.rating.track.backgroundColor,
        height: 3,
        borderRadius: 100
    },
    selectedStyle: {
        backgroundColor: theme.input.rating.track.selectedColor,
        height: 4
    },
    markerStyle: {
        backgroundColor: theme.input.rating.track.selectedColor,
        height: 16,
        width: 16,
        borderRadius: 8
    },
    ratingLabelView: {
        position: 'absolute',
        top: 40
    }
})

function Rating({
    selectRating = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [rating, setRating] = useState([0, 5]);

    const customLabel = ({
        oneMarkerLeftPosition, oneMarkerValue,
        twoMarkerLeftPosition, twoMarkerValue,
    }) =>
        <View style={styles.ratingLabelView}>
            <Text
                style={{
                    position: 'absolute',
                    left: twoMarkerLeftPosition - 5,
                    fontFamily: theme.font.family,
                    letterSpacing: theme.font.letterSpacing2,
                    color: theme.font.color,
                    fontSize: 13
                }}
            >
                {twoMarkerValue}
            </Text>
            <Text
                style={{
                    position: 'absolute',
                    marginLeft: oneMarkerLeftPosition - 5,
                    fontFamily: theme.font.family,
                    letterSpacing: theme.font.letterSpacing2,
                    color: theme.font.color,
                    fontSize: 13
                }}
            >
                {oneMarkerValue}
            </Text>
        </View>

    return (
        <View style={styles.contentView}>
            <View style={[styles.ratingView, { marginBottom: 10 }]}>
                <Text style={styles.ratingHeaderText}>РЕЙТИНГ</Text>
                <MultiSlider
                    values={[rating[0], rating[1]]}
                    sliderLength={FULL_WIDTH - 40}
                    onValuesChange={selectRating}
                    min={0}
                    max={5}
                    step={1}
                    customLabel={customLabel}
                    labels={['0', '1', '2', '3', '4']}
                    trackStyle={styles.trackStyle}
                    selectedStyle={styles.selectedStyle}
                    markerStyle={styles.markerStyle}
                    enableLabel={true}
                    snapped={true}
                />
            </View>
        </View>
    )
}

export { Rating };