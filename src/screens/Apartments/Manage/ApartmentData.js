import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View,
    Text, TouchableOpacity
} from 'react-native';

import { Input, Sub } from '@c';
import { useTheme } from '@h'
import { RoomsInput } from './RoomsInput';

const makeStyles = (theme) => StyleSheet.create({
    roomsView: {
        marginHorizontal: 20
    },
    roomsHeaderText: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
    },
    roomsCountView: {
        height: 32,
        width: '100%',
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        marginTop: 20,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    roomCountView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    inputDescriptionText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17
    },
    cancelText: {
        color: 'red',
        marginLeft: 10,
        textDecorationLine: 'underline',
    }
})


function ApartmentData({
    options = {},
    cancel = false,
    updateOptions = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    useEffect(() => {
        // prettyPrint(options)
    }, [options])

    const Header = ({ text, option }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.roomsHeaderText}>{text}</Text>
                {cancel &&
                    <TouchableOpacity
                        onPress={() => updateOptions(option, null)}
                    >
                        <Text style={styles.cancelText}>Сбросить</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    return (
        <>
            <View style={styles.roomsView}>
                <Header text={'ЦЕНА'} option={'price'} />
                <Input
                    value={options.price && `${options.price}`}
                    type={'default'}
                    placeholder={'2000'}
                    onChange={(text) => updateOptions('price', text ? parseInt(text) : undefined)}
                    keyboardType={'number-pad'}
                    description={<Text style={styles.inputDescriptionText}>Р.</Text>}
                />
            </View>
            <View style={styles.roomsView}>
                <Header text={'ПЛОЩАДЬ'} option={'area'} />
                <Input
                    value={options.area && `${options.area}`}
                    type={'default'}
                    placeholder={'45'}
                    onChange={(text) => updateOptions('area', text ? parseInt(text) : undefined)}
                    keyboardType={'number-pad'}
                    description={<Sub base='м' exponent={2} baseFontSize={17} />}
                />
            </View>
            <View style={styles.roomsView}>
                <Header text={'ЭТАЖ'} option={'floor'} />
                <Input
                    value={options.floor && `${options.floor}`}
                    placeholder={'5'}
                    type={'default'}
                    onChange={(text) => updateOptions('floor', text ? parseInt(text) : undefined)}
                    keyboardType={'number-pad'}
                />
            </View>
            <RoomsInput
                options={options}
                updateOptions={updateOptions}
            />
            <View style={styles.roomsView}>
                <Header text={'ОБЩЕДОМОВЫЕ РАСХОДЫ'} option={'share_payment'} />
                <Input
                    value={options.share_payment && `${options.share_payment}`}
                    placeholder={'2000'}
                    type={'default'}
                    onChange={(text) => updateOptions('share_payment', text ? parseInt(text) : undefined)}
                    keyboardType={'number-pad'}
                    description={<Text style={styles.inputDescriptionText}>Р.</Text>}
                />
            </View>
            <View style={styles.roomsView}>
                <Header text={'ОПИСАНИЕ'} option={'description'}/>
                <Input
                    value={options.description && `${options.description}`}
                    multiline={true}
                    placeholder={'Описание'}
                    type={'default'}
                    onChange={(text) => updateOptions('description', text)}
                    maxLength={500}
                    warning={'Максимальная длинна 500 символов.'}
                />
            </View>
        </>
    )
}

export { ApartmentData };