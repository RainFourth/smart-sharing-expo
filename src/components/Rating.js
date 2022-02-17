import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useThemeObj } from '@h';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row'
    }
})

function Rating({
    rating, style, color
}) {
    const theme = useThemeObj();

    const [rating_, setRating_] = useState([]);
    const [starColor, setStarColor] = useState(theme.review.ratingColor);

    useEffect(() => {
        if (color) setStarColor(color);

        let tmp = [];

        for (let i = 0; i < 5; i++) {
            tmp.push(i < rating);
        }

        setRating_(tmp);
    }, []);


    return (
        <View style={{
            ...styles.root,
            ...style
        }}>
            {rating_.map((el, i) =>
                <FontAwesome
                    key={`${i}`}
                    name={el ? 'star' : 'star-o'}
                    size={16}
                    color={starColor}
                />
            )}
        </View>
    )
}

export { Rating };