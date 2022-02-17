import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, View,
    TouchableOpacity, Text,
    Image, ScrollView,
    VirtualizedList
} from 'react-native';
import { Config } from 'react-native-config';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    button: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.button.backgroundColor.picker,
        borderRadius: 22
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
        alignItems: 'center',
    }
})

function FileUploader({
    values = [],
    updateOptions = () => { },
    onAddImages = () => { },
    onDelete = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [images, setImages] = useState([]);
    const [removeIndex, setRemoveIndex] = useState(null);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (values.length > 0)
            setImages(values.map(el => ({
                ...el,
                path: `${Config.API_URL}/${el.path}`
            })))
    }, [values])

    const chooseFile = async () => {
        try {
            // ImagePicker.openCamera({
            //     compressImageMaxWidth: 1920, 
            //     compressImageQuality: 0.7
            //     // width: 1920,
            //     // height: 400,
            //     // cropping: true,
            // }).then(image => {
            //     setFoto(image)
            //     console.log(image);
            // });

            const _images = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                compressImageMaxWidth: 1920,
                compressImageQuality: 0.7,
                minFiles: 1,
                maxFiles: 10 - images.length,
                // includeBase64: true
            });

            let newImages = [];

            if (images.length + _images.length < 11) {
                setImages(prev => [...prev, ..._images]);
                newImages = _images;
            } else if (images.length + _images.length > 10) {
                let tmp = [...images];
                for (let i = 0; i + tmp.length < 11; i++) {
                    tmp.push(_images[i]);
                    newImages.push(_images[i]);
                }
                setImages(tmp);
            }

            // setImages(prev => {
            //     if (prev.length + _images.length < 11)
            //         return [...prev, ..._images];
            //     else if (prev.length + _images.length > 10) {
            //         let tmp = [...prev];
            //         for (let i = 0; i + tmp.length < 11; i++) {
            //             tmp.push(_images[i]);
            //         }
            //         return tmp;
            //     }
            // });

            // ImagePicker.clean();

            onAddImages(newImages);
        } catch (e) {
            if (e.code !== 'E_PICKER_CANCELLED')
                throw e;
        }
    };

    useEffect(() => {
        if (removeIndex !== null) {
            let tmp = images;
            tmp.splice(removeIndex, 1);
            setImages(tmp);
            setRemoveIndex(null);
        }
    }, [removeIndex]);

    useEffect(() => {
        let tmp = [];

        images.map(el => {
            tmp.push({
                name: 'image.jpg',
                type: el.mime,
                uri: el.path,
                isFile: true
            })
        })
        updateOptions('images', tmp);
    }, [images])

    const delImage = (el, i) => {
        onDelete(el);
        setImages(prev => {
            prev = prev.filter(image => image.path !== el.path);
            return prev;
        });
        if (i >= images.length - 2 && images.length !== 1)
            scrollRef.current.scrollToEnd();
    }

    const renderImages = (el, i) => {
        return (
            <View
                key={`${i}`}
            >
                <Image
                    style={{
                        width: 200,
                        height: 120,
                        marginRight: i !== images.length - 1 ? 10 : 20,
                        marginLeft: i === 0 ? 20 : 0,
                        borderRadius: 10
                    }}
                    // source={{ uri: `data:${el.mime};base64,${el.data}` }}
                    source={{ uri: el.path }}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 10,
                        padding: i !== images.length - 1 ? 10 : 20,
                        paddingTop: 10
                    }}
                    onPress={() => delImage(el, i)}
                >
                    <Feather
                        name='x-square'
                        size={24}
                        color={theme.button.textColor.picker}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <VirtualizedList
                style={{
                    marginVertical: 20
                }}
                ref={scrollRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={images}
                initialNumToRender={4}
                renderItem={({ item, index }) => {
                    return renderImages(item, index);
                }}
                keyExtractor={item => `${item.key}`}
                getItemCount={(data) => data.length}
                getItem={(data, index) => {
                    return {
                        key: index,
                        ...data[index]
                    }
                }}
            />
            {images.length < 10 &&
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        height: images.length !== 0 ? 40 : 100
                    }}
                    activeOpacity={0.5}
                    onPress={() => chooseFile()}>
                    <View style={styles.buttonTextView}>
                        <Text style={styles.buttonText}>Добавть фотографии</Text>
                        <Feather
                            name='camera'
                            size={24}
                            color='#fff'
                        />
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

export { FileUploader };