import React, { useEffect, useState } from 'react';
import {
    View, Text,
    StyleSheet, TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        height: 34,
        alignItems: 'center'
    },
    itemText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        flex: 1,
        fontSize: 15
    }
})

function CheckboxList({
    list = [],
    values = [],
    onUpdate = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [selected, setSelected] = useState([]);

    const updateSelected = (id) => {
        if (selected.indexOf(id) !== -1) {
            setSelected(prev => {
                let tmp = prev;
                tmp = tmp.filter(el => el !== id);
                return [...tmp]
            })
        } else setSelected(prev => [...prev, id]);
    }

    useEffect(() => {
        if (values.length > 0)
            setSelected(values.map(el => el.id));
    }, [values])

    useEffect(() => {
        onUpdate(selected);
    }, [selected])

    return (
        <View>
            {list.map(el =>
                <TouchableOpacity
                    key={`${el.id}`}
                    style={styles.itemView}
                    onPress={() => updateSelected(el.id)}
                >
                    <Text
                        style={styles.itemText}
                    >{el.name}</Text>
                    <CheckBox
                        isChecked={selected.indexOf(el.id) !== -1}
                        onClick={() => updateSelected(el.id)}
                        uncheckedCheckBoxColor={theme.input.checkbox.color}
                        checkBoxColor={theme.input.checkbox.selected.color}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export { CheckboxList }