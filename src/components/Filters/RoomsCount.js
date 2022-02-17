import React, { useState, useEffect } from 'react';
import {
    View, Text,
    TouchableOpacity, StyleSheet
} from 'react-native';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    roomsView: {
        marginVertical: 40
    },
    roomsHeaderText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
    },
    roomsCountView: {
        height: 32,
        width: '100%',
        backgroundColor: theme.category.backgroundColor,
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
    roomCountViewSelected: {
        backgroundColor: theme.category.selected.backgroundColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    roomCountText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.category.textColor,
        fontSize: 15,
    },
    roomCountTextSelected: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.category.selected.textColor,
        fontSize: 15,
    },
})

function RoomsCount({
    options = {},
    setOptions = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [roomsCount, setRoomsCount] = useState(['Студия', 1, 2, 3, '4+']);
    const [selectedRoomsCount, setSelectedRoomsCount] = useState([]);

    useEffect(() => {
        if (options.is_studio)
            setSelectedRoomsCount(prev => [...prev, 0]);
        if (options.min_rooms_count)
            setSelectedRoomsCount(prev => [...prev, roomsCount.length - 1]);
        if (options.rooms_count && options.rooms_count.length > 0) {
            setSelectedRoomsCount(prev => [...prev, ...options.rooms_count]);
        }
    }, [])

    const selectRoomsCount = (el) => {
        let tmp = selectedRoomsCount;
        let index = tmp.indexOf(roomsCount.indexOf(el));

        if (index > -1)
            tmp.splice(index, 1);
        else
            tmp.push(roomsCount.indexOf(el));

        setSelectedRoomsCount(tmp);

        if (el === roomsCount[0]) {
            if (options.is_studio)
                setOptions(prev => ({ ...prev, is_studio: false }));
            else
                setOptions(prev => ({ ...prev, is_studio: true }));
        } else if (el === roomsCount[roomsCount.length - 1]) {
            if (selectedRoomsCount.indexOf(roomsCount.indexOf(roomsCount[roomsCount.length - 1])) > -1)
                setOptions(prev => ({ ...prev, min_rooms_count: 4 }));
            else
                setOptions(prev => ({ ...prev, min_rooms_count: undefined }));
        } else {
            setOptions(prev => ({ ...prev, rooms_count: tmp }));
        }
    }

    return (
        <View style={styles.roomsView}>
            <Text style={styles.roomsHeaderText}>
                КОЛЛИЧЕСТВО КОМНАТ
            </Text>
            <View style={styles.roomsCountView}>
                {roomsCount.map((el, i) => {
                    return (
                        <View key={`${i}`} style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity
                                style={selectedRoomsCount.indexOf(i) > -1 ? styles.roomCountViewSelected : styles.roomCountView}
                                onPress={() => selectRoomsCount(el)}
                            >
                                <Text style={selectedRoomsCount.indexOf(i) > -1 ? styles.roomCountTextSelected : styles.roomCountText}>{el}</Text>
                            </TouchableOpacity>
                            {i !== roomsCount.length - 1 &&
                                <View style={styles.verticalLineView}>
                                    <View style={styles.verticalLine} />
                                </View>
                            }
                        </View>)
                }
                )}
            </View>
        </View>
    )
}

export { RoomsCount }