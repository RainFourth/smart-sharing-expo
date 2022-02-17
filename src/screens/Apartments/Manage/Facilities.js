import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet,
    Text, TouchableOpacity
} from 'react-native';

import { Input } from '@c';
import CheckBox from 'react-native-check-box';

import { useTheme, useThemeObj } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        marginHorizontal: 20,
        marginTop: 40
    },
    headerText: {
        fontFamily: theme.font.familyBold,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
        marginBottom: 20
    },
    line: {
        height: 1,
        backgroundColor: theme.colors.line,
        marginVertical: 40
    },
    itemView: {
        flexDirection: 'row',
        height: 34,
        alignItems: 'center'
    },
    itemText: {
        flex: 1,
        fontSize: 15
    }
})

function Facilities({
    options = {},
    facilities = [],
    setOptions = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [values, setValues] = useState([])

    const [options_, setOptions_] = useState({
        with_childs: false,
        with_animals: false,
        checklist: []
    });

    const updateWith = (key) => {
        setOptions_(prev => ({ ...prev, [key]: !options_[key] }));
    }

    useEffect(() => {
        if (options.checklist)
            setValues(options.checklist);
        if (options.with_childs)
            setOptions_(prev => ({
                ...prev,
                with_childs: options.with_childs
            }))
        if (options.with_animals)
            setOptions_(prev => ({
                ...prev,
                with_animals: options.with_animals
            }))
    }, [options])

    useEffect(() => {
        setOptions(prev => ({
            ...prev,
            ...options_
        }))
    }, [options_])

    return (
        <View style={styles.root}>
            <Text style={styles.headerText}>УДОБСТВА</Text>
            <Input
                values={values}
                type='list'
                list={facilities}
                onUpdate={(ids) => setOptions_(prev => ({ ...prev, checklist: ids }))}
            />
            <View style={styles.line} />
            <View>
                <TouchableOpacity
                    style={styles.itemView}
                    onPress={() => updateWith('with_childs')}
                >
                    <Text style={styles.itemText}>Можно с детьми</Text>
                    <CheckBox
                        isChecked={options_.with_childs}
                        onClick={() => updateWith('with_childs')}
                        uncheckedCheckBoxColor={theme.input.checkbox.color}
                        checkBoxColor={theme.input.checkbox.selected.color}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemView}
                    onPress={() => updateWith('with_animals')}
                >
                    <Text style={styles.itemText}>Можно с животными</Text>
                    <CheckBox
                        isChecked={options_.with_animals}
                        onClick={() => updateWith('with_animals')}
                        uncheckedCheckBoxColor={theme.input.checkbox.color}
                        checkBoxColor={theme.input.checkbox.selected.color}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { Facilities }