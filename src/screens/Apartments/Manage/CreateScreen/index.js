import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View,
    ScrollView, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { API_URL } from "@env";

import {
    Container, ScreenHeader,
    FileUploader, Category,
    Button, Popup
} from '@c';
import { useTheme, useThemeObj } from '@h';
import { Facilities } from '../Facilities';
import { Address } from '../Address';
import { ApartmentData } from '../ApartmentData';
import { SelectOnMap } from '../SelectOnMap';

import * as apartmentsService from '@se/apartmentsService';
import { fetcher } from '@u';

const makeStyles = (theme) => StyleSheet.create({
    rootView: {
        backgroundColor: theme.backgroundColor.mainColor
    },
    categoriesView: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 42
    },
    line: {
        height: 1,
        backgroundColor: theme.colors.line,
        marginHorizontal: 20,
        marginVertical: 40
    }
})

function CreateScreen({ navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [firstStep, setFirstStep] = useState(true);

    const [apartmentsTypes, setApartmentsTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [facilities, setFacilities] = useState([]);

    const [options, setOptions] = useState({});
    const [point, setPoint] = useState(null);

    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

    const getAtartmentsTypes = async () => {
        const { error, status, payload } = await apartmentsService.getCategories();

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return;
        }

        setApartmentsTypes(payload);
    }

    const getFacilities = async () => {
        const { error, status, payload: { count, items } } = await apartmentsService.getFacilities();

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return;
        }

        setFacilities(items);
    }

    useEffect(() => {
        getAtartmentsTypes();
        getFacilities()
    }, [])

    const updateOptions = (key, value) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const createApartment = async () => {
        if (options.apartment_category_id === undefined) {
            setPopupText('Вы не указали категорию');
            setPopup(true);
            return;
        }

        if (options.price !== undefined) {
            if (options.price < 0) {
                setPopupText('Минимальная цена 0');
                setPopup(true);
                return;
            }
        } else {
            setPopupText('Вы не указали цену');
            setPopup(true);
            return;
        }

        if (options.area !== undefined) {
            if (options.area <= 0) {
                setPopupText('Площадь должна быть больше 0');
                setPopup(true);
                return;
            }
        } else {
            setPopupText('Вы не указали площадь');
            setPopup(true);
            return;
        }

        if (options.floor !== undefined) {
            if (options.floor <= 0) {
                setPopupText('Этаж должен быть больше 1');
                setPopup(true);
                return;
            }
        }

        if (options.rooms_count !== undefined) {
            if (options.rooms_count <= 0 && options.is_studio === false) {
                setPopupText('Минимальное количество комнат 1');
                setPopup(true);
                return;
            }
        } else {
            if (options.is_studio === false) {
                setPopupText('Вы не указали количество комнат');
                setPopup(true);
                return;
            }
        }

        if (options.share_payment !== undefined) {
            if (options.share_payment <= 0) {
                setPopupText('Общедомовые расходы должды быть больше 0');
                setPopup(true);
                return;
            }
        } else {
            setPopupText('Вы не указали общедомовые раскходы');
            setPopup(true);
            return;
        }

        if (options.description === undefined || options.description === '') {
            setPopupText('Вы не заполнили описание');
            setPopup(true);
            return;
        }

        if (point === null) {
            setPopupText('Вы не указали дом на карте');
            setPopup(true);
            return;
        }

        if (options.images === undefined || options.images.length < 1) {
            setPopupText('Вы не выбрали фотографии');
            setPopup(true);
            return;
        }

        let options_ = {
            ...options,
            images: [...options.images.map(el => ({ ...el }))]
        };

        if (options_.is_studio) {
            delete options_.rooms_count;
        }

        if (options_.floor === undefined) {
            delete options_.floor;
        }

        delete options_.checklist;

        // TODO migrate to repository
        // const { error, status } = await fetcher.post(`${API_URL}/apartments`, options_, { type: 'multipart' });
        const response = await fetch(`${API_URL}/apartments`, {
            method: 'POST',
            body: (() => {
                let body = fetcher.JSONtoFormData(options_);
                body.append('checklist', JSON.stringify(options.checklist))
                return body;
            })()
        })

        const { status } = response;

        try {
            const { error } = await response.json();

            if (status > 299) {
                // TODO replace to modal
                alert(JSON.stringify(error));
                return;
            }
        } catch (e) {
            setPopupText('Измениения проверят, после одобрения они появятся.');
            setPopup(true);
        }
        return;

    }

    return (
        <>
            <StatusBar
                translucent={true}
                barStyle="dark-content"
                animated={true}
                backgroundColor="rgba( 255, 255, 255, 0 )"
            />
            <Container>
                <ScreenHeader
                    header={'Добавление жилья'}
                    onBackPress={() => {
                        if (!firstStep) setFirstStep(true);
                        else navigation.goBack()
                    }}
                />
                <ScrollView
                    style={{
                        flex: 1,
                        display: firstStep ? 'flex' : 'none',
                        ...styles.rootView
                    }}
                >
                    <View
                        style={styles.categoriesView}
                    >
                        {apartmentsTypes.map(el =>
                            <Category
                                key={`${el.id}`}
                                selected={el.id === selectedType}
                                categories={apartmentsTypes}
                                name={el.name}
                                onPress={() => {
                                    setSelectedType(el.id);
                                    updateOptions('apartment_category_id', el.id);
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.line} />
                    <ApartmentData
                        options={options}
                        setOptions={setOptions}
                        updateOptions={updateOptions}
                    />
                    <Facilities
                        facilities={facilities}
                        setOptions={setOptions}
                    />
                    <Address
                        point={point}
                        price={options?.price}
                        onPress={() => setFirstStep(false)}
                    />
                    <FileUploader
                        updateOptions={updateOptions}
                    />
                    <Button
                        placeholder='Разместить квартиру'
                        style={{
                            marginBottom: 14
                        }}
                        onPress={() => createApartment()}
                    />
                </ScrollView>
                <SelectOnMap
                    style={{
                        flex: 1,
                        display: firstStep ? false : true
                    }}
                    display={!firstStep}
                    price={options?.price}
                    onPointChange={(point) => {
                        setOptions(prev => ({
                            ...prev,
                            longitude: point.longitude,
                            latitude: point.latitude
                        }));
                        setPoint(point);
                    }}
                    confirm={() => setFirstStep(true)}
                />
                <Popup
                    visible={popup}
                    setVisible={setPopup}
                    text={popupText}
                    icon={<Icon
                        name='alert-circle'
                        size={30}
                        color={theme.colors.light4}
                    />}
                />
            </Container>
        </>
    )
}

export { CreateScreen };