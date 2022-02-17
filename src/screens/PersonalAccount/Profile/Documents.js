import React, {
    useEffect, useState
} from 'react';
import {
    StyleSheet, View,
    Text, Image
} from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20,
        marginTop: 30
    },
    title: {
        fontFamily: theme.font.familyBold,
        color: theme.font.headerColor,
        letterSpacing: theme.font.letterSpacing2,
        fontSize: 13,
    },
    imagesView: {
        marginTop: 15
    },
    image: {
        width: '100%',
        height: 300
    }
})

function Documents({
    title = '', documents = []
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [images, setImages] = useState([]);

    const getImages = async () => {
        if (documents.length > images.length)
            for (const img of documents) {
                const req = new XMLHttpRequest();
                req.open("GET", `https://css-dev.xyz/smartsharing-api/users/documents/${img.path}`, true);
                req.responseType = "arraybuffer";

                req.onload = () => {
                    if (req.response) {
                        // console.log(Object.keys(req))
                        setImages(prev => [...prev, {
                            base: req._response,
                            mimeType: req.responseHeaders['Content-Type']
                        }])
                    }
                };

                req.send(null);
            }
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <View style={styles.root}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.imagesView}>
                {images.map((el, i) =>
                    <Image
                        key={`${i}`}
                        style={styles.image}
                        source={{
                            uri: `data:${el.mimeType};base64,${el.base}`
                        }}
                    />
                )}
            </View>
        </View>
    )
}

export { Documents }