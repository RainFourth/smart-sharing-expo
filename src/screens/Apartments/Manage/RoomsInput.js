import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet,
    Text, TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';

import { Input } from '@c';
import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    roomsView: {
        marginHorizontal: 20,
    },
    roomsHeaderText: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
    },
    inputDescriptionText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17
    },
    itemView: {
        flexDirection: 'row',
        height: 34
    },
    itemText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 15,
        flex: 1
    }
})

function RoomsInput({
    options,
    updateOptions
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [isStudio, setIsStudio] = useState(false);
    const [isPenthouse, setIsPenthouse] = useState(false);

    useEffect(() => {
        if (options.is_studio)
            setIsStudio(options.is_studio);
        if (options.is_penthouse)
            setIsPenthouse(options.is_penthouse);
    }, [options])

    useEffect(() => {
        updateOptions('is_studio', isStudio);
    }, [isStudio])

    useEffect(() => {
        updateOptions('is_penthouse', isPenthouse);
    }, [isPenthouse])

    return (
        <View style={styles.roomsView}>
            <Text style={styles.roomsHeaderText}>КОЛЛИЧЕСТВО КОМНАТ</Text>
            <Input
                value={options.rooms_count && `${options.rooms_count}`}
                type={'default'}
                placeholder={'Количество комнат'}
                onChange={(text) => updateOptions('rooms_count', text ? parseInt(text) : undefined)}
                keyboardType={'number-pad'}
                description={<Text style={styles.inputDescriptionText}>комнат</Text>}
                warning='Количество комнат должны быть не меньше 1'
                disabled={isStudio}
            />
            <TouchableOpacity
                style={styles.itemView}
                onPress={() => setIsStudio(!isStudio)}
            >
                <Text style={styles.itemText}>Студия</Text>
                <CheckBox
                    isChecked={isStudio}
                    onClick={() => setIsStudio(!isStudio)}
                    checkBoxColor='#DADADA'
                    checkedCheckBoxColor='#592EDB'
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.itemView}
                onPress={() => setIsPenthouse(!isPenthouse)}
            >
                <Text style={styles.itemText}>Пентхаус</Text>
                <CheckBox
                    isChecked={isPenthouse}
                    onClick={() => setIsPenthouse(!isPenthouse)}
                    checkBoxColor='#DADADA'
                    checkedCheckBoxColor='#592EDB'
                />
            </TouchableOpacity>
        </View>
    )
}

export { RoomsInput };