import React, { useEffect, useState } from 'react';
import {
    ScrollView, View,
    Text, StyleSheet,
    Dimensions, Keyboard
} from 'react-native';

import { Button, Input } from '@c';
import * as apartmentsService from '@se/apartmentsService';
import { DoubleInput } from './DoudleInput';
import { Category } from './Category';
import { Facilities } from './Facilities';
import { Rating } from './Rating';
import { RoomsCount } from './RoomsCount';

import {useTheme, useThemeNew} from '@h';

const makeStyles = (theme) => StyleSheet.create({
    root: {
        flex: 1,
    },
    contentView: {
        marginHorizontal: 20
    },
    categoriesView: {
        flexDirection: 'row',
        marginVertical: 40
    },
    roomsView: {
        marginVertical: 40
    },
    roomsHeaderText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing2,
        color: theme.font.headerColor,
        fontSize: 13,
    },
    line: {
        height: 1,
        backgroundColor: theme.colors.line
    }
});

function Filters({ options, setOptions, onApply }) {
    //const styles = useTheme(theme => makeStyles(theme), []);
    const { style:styles } = useThemeNew(makeStyles)

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [facilities, setFacilities] = useState([]);
    const [selectedFasilities, setSelectedFasilities] = useState([]);

    const [rating, setRating] = useState([0, 5]);

    const [search, setSearch] = useState([]);

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const getCategories = async () => {
        const { status, error, payload } = await apartmentsService.getCategories();

        if (status > 299) {
            // TODO replace to model
            alert(error);

            return;
        }

        setCategories(payload);
    }

    const getFacilities = async () => {
        const { status, error, payload: { items } } = await apartmentsService.getFacilities();

        if (status > 299) {
            // TODO replace to modal
            alert(error)

            return;
        }

        setFacilities(items);
    }

    function onKeyboardDidShow(e) {
        setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(0);
    }

    useEffect(() => {
        getCategories();
        getFacilities();

        if (options.apartment_category_ids)
            setSelectedCategories(options.apartment_category_ids);

        if (options.avg_rating_max !== undefined && options.avg_rating_min !== undefined)
            setRating([options.avg_rating_min, options.avg_rating_max]);

        if (options.search) {
            setSearch(options.search.match(/[A-zА-я0-9]+/g));
        }

        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, [])

    useEffect(() => {
        setOptions(prev => ({
            ...prev,
            checklist_ids: selectedFasilities.checklist,
            with_animals: selectedFasilities.with_animals,
            with_childs: selectedFasilities.with_childs
        }))
    }, [selectedFasilities]);

    useEffect(() => {
        if (search) {
            setOptions(prev => ({
                ...prev, search: `${search}`
            }));
        }
    }, [search]);

    const selectCategory = (id) => {
        let tmp = selectedCategories;
        let index = tmp.indexOf(id)

        if (index > -1)
            tmp.splice(index, 1);
        else
            tmp.push(id);

        setOptions(prev => ({ ...prev, apartment_category_ids: tmp }));
        setSelectedCategories(tmp);
    }

    const selectRating = (el) => {
        setOptions(prev => ({
            ...prev,
            avg_rating_min: el[0],
            avg_rating_max: el[1]
        }))
        setRating(el);
    }

    const changeOptions = (key, val) => {
        setOptions(prev => ({
            ...prev,
            [key]: Number.parseInt(val)
        }))
    }

    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentView}>
                <View
                    style={styles.categoriesView}
                >
                    {categories.map(el =>
                        <Category
                            key={`${el.id}`}
                            selected={selectedCategories.indexOf(el.id) > -1}
                            categories={categories}
                            name={el.name}
                            onPress={() => selectCategory(el.id)}
                        />
                    )}
                </View>
                <View style={styles.line} />
            </View>
            <View style={styles.contentView}>
                <RoomsCount setOptions={setOptions} options={options} />
                <View style={styles.line} />
            </View>
            <View style={styles.contentView}>
                <DoubleInput
                    type='price'
                    header='ЦЕНА'
                    minValue={options.price_min}
                    maxValue={options.price_max}
                    onMinChange={e => changeOptions('price_min', e)}
                    onMaxChange={e => changeOptions('price_max', e)}
                />
            </View>
            <View style={styles.contentView}>
                <DoubleInput
                    type='area'
                    header='ПЛОЩАДЬ'
                    minValue={options.area_min}
                    maxValue={options.area_max}
                    onMinChange={e => changeOptions('area_min', e)}
                    onMaxChange={e => changeOptions('area_max', e)}

                />
            </View>
            <View style={styles.contentView}>
                <DoubleInput
                    header='ЭТАЖ'
                    minValue={options.floor_min}
                    maxValue={options.floor_max}
                    onMinChange={e => changeOptions('floor_min', e)}
                    onMaxChange={e => changeOptions('floor_max', e)}

                />
            </View>
            <Rating
                selectRating={selectRating}
            />
            <Facilities
                options={options}
                facilities={facilities}
                setOptions={setSelectedFasilities}
            />
            <View style={styles.contentView}>
                <View style={styles.roomsView}>
                    <Text style={styles.roomsHeaderText}>
                        ПО КЛЮЧЕВЫМ СЛОВАМ
                    </Text>
                    <Input
                        multiline={true}
                        placeholder={'Десткий сад, школа, бассейн и т.д.'}
                        type={'default'}
                        onChange={(text) => {
                            setSearch(text.match(/[A-zА-я0-9]+/g));
                        }}
                        value={options.search && options.search.match(/[A-zА-я0-9]+/g).join(', ')}
                        maxLength={500}
                    />
                </View>
            </View>
            <View style={styles.line} />
            <Button
                placeholder='Применить фильтр'
                onPress={onApply}
                style={{
                    marginBottom: 20
                }}
            />
            <View
                style={{
                    height: keyboardHeight
                }}
            />
        </ScrollView>
    )
}

export { Filters }