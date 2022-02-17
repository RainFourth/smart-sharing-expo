import React, {
    useState, useEffect,
    useRef
} from 'react';
import {
    TextInput, View,
    Dimensions, TouchableOpacity,
    StyleSheet, ScrollView, Text,
    Keyboard, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as apartmentsService from "@se/apartmentsService";
import { useTheme } from '@h';

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;
const { height: FULL_HEIGHT } = dimensions;

const makeStyles = (theme) => StyleSheet.create({
    root: {
        position: 'absolute',
        width: FULL_WIDTH - 20,
        borderRadius: 8,
        top: 40,
        left: 10,
        paddingVertical: 0,
        backgroundColor: theme.backgroundColor.mainColor,
        alignItems: 'center'
    },
    backIcon: {
        width: 24,
        marginLeft: 10
    },
    input: {
        fontFamily: theme.font.familyBold,
        color: theme.mapSearch.textColor,
        letterSpacing: theme.mapSearch.letterSpacing,
        flex: 1,
        fontSize: 15,
    },
    filter: {
        width: 24,
        marginRight: 10
    }
})

function MapSearch({
    city, onBack,
    onFilters,
    setFiltersOptions = () => { },
    applyAddress = () => { },
    showVariant = false,
    setShowVariant = () => { }
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const inputRef = useRef();

    const [streets, setStreets] = useState([]);
    const [suitableStreets, setSuitableStreets] = useState([]);
    const [selectedStreets, setSelectedStreets] = useState(null);

    const [houses, setHouses] = useState([]);
    const [suitableHouses, setSuitableHouses] = useState([]);

    // const [_showVariant, setShowVariant] = useState(showVariant);

    const [inputVal, setInputVal] = useState('');

    const getStreets = async () => {
        const { status, errors, payload } = await apartmentsService.getStreets(city.id);

        if (status > 299) {
            // TODO replace to modal
            alert(errors);
            return;
        }

        let tmp = payload.filter(el => el.city_id === city.id);

        setStreets(payload);
        setSuitableStreets(payload);
    }

    const getHouses = async () => {
        const { status, errors, payload } = await apartmentsService.getHouses(city.id, selectedStreets.id);

        if (status > 299) {
            // TODO replace to modal
            alert(errors);
            return;
        }

        setHouses(payload);
        setSuitableHouses(payload);
    }

    useEffect(() => {
        getStreets();
    }, [])

    const setFilters = () => {
        if (selectedStreets) {
            setFiltersOptions(prev => {
                return {
                    ...prev,
                    street_id: selectedStreets.id
                }
            })
        } else {
            setFiltersOptions(prev => ({
                ...prev,
                street_id: undefined
            }));
        }
    }

    useEffect(() => {
        // setFilters();
        if (selectedStreets !== null) {
            applyAddress('street_id', selectedStreets.id)
            getHouses();
        } else {
            applyAddress('street_id', null);
            setSuitableStreets(streets);
        }
    }, [selectedStreets])

    return (
        <View
            style={styles.root}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={onBack}
                >
                    <Icon
                        name='arrow-left'
                        size={24}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    autoCompleteType='street-address'
                    placeholder='улица Ленина'
                    value={inputVal}
                    onFocus={() => setShowVariant(true)}
                    // onChangeText={text => setInputVal(text)}
                    onChangeText={(text) => {
                        // console.log(text)
                        // if (selectedStreets && text === `${selectedStreets.name},`) {
                        //     setInputVal('');
                        //     setSelectedStreets(null);
                        //     setShowVariant(true);
                        //     return;
                        // }

                        // if (selectedStreets) {
                        //     text = text.replace(selectedStreets.name, '');
                        // }

                        if (selectedStreets !== null && text === selectedStreets.name) {
                            setSelectedStreets(null);
                            setInputVal('');
                            return;
                        }

                        setInputVal(text);
                        text = text.toLowerCase();
                        let matcher = new RegExp(text, 'g');

                        let tmp = streets.filter(el => matcher.test(el.name.toLowerCase()));

                        if (tmp.length === 1) {
                            setSelectedStreets(tmp[0]);
                            // setShowVariant(false);
                            setInputVal(`${tmp[0].name},`);
                            return;
                        }

                        setSuitableStreets(tmp);
                    }}
                />
                <TouchableOpacity
                    onPress={onFilters}
                >
                    <Icon
                        name='sliders'
                        size={24}
                        style={styles.filter}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{
                    width: '100%',
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 9,
                    padding: 10,
                    paddingBottom: 20,
                    maxHeight: 200,
                    display: showVariant ? 'flex' : 'none'
                }}
                keyboardShouldPersistTaps='handled'
            >
                {selectedStreets === null && suitableStreets.map(el => {
                    return (
                        <TouchableOpacity
                            key={el.id}
                            onPress={() => {
                                setSelectedStreets(el);
                                setInputVal(`${el.name},`)
                                // setShowVariant(false);
                                inputRef.current.focus()
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    marginVertical: 5
                                }}
                            >{el.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                {selectedStreets && suitableHouses.map(el => {
                    return (
                        <TouchableOpacity
                            key={el.id}
                            onPress={() => {
                                // setSelectedStreets(el);
                                // setInputVal(`${el.name},`)
                                // setShowVariant(false);
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    marginVertical: 5
                                }}
                            >{selectedStreets.name}, {el.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export { MapSearch };