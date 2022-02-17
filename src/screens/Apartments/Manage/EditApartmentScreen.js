import React, { useEffect, useState } from 'react';
import {
    StyleSheet, ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme, useThemeObj } from '@h';
import { Container, ScreenHeader, Category, FileUploader, Preloader, Button, Popup, InfoMessage } from '@c'
import { prettyPrint } from '@u';

import { ApartmentData } from './ApartmentData';
import { Facilities } from './Facilities';
import { Address } from './Address';
import { SelectOnMap } from './SelectOnMap';

import * as apartmentsService from '@se/apartmentsService';

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

function EditApartmentScreen({ route: { params: { id } }, navigation }) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const [firstStep, setFirstStep] = useState(true);
    const [point, setPoint] = useState(null);

    const [apartment, setApartment] = useState(null);
    const [updateApartment, setUpdateApartment] = useState(null);
    const [apartmentsTypes, setApartmentsTypes] = useState([]);
    const [facilities, setFacilities] = useState([]);

    const [draftApartment, setDraftApartment] = useState({});
    const [draft, setDraft] = useState({});
    const [deleteImageIds, setDeleteImageIds] = useState([]);
    const [deleteNewImagesIds, setDeleteNewImagesIds] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

    const getAtartmentsTypes = async () => {
        const { errors, status, payload } = await apartmentsService.getCategories();

        if (status > 299) {
            // TODO replace to modal
            alert(prettyPrint(errors, 'str'));
            return;
        }

        setApartmentsTypes(payload);
    }

    const getFacilities = async () => {
        const { errors, status, payload: { count, items } } = await apartmentsService.getFacilities();

        if (status > 299) {
            // TODO replace to modal
            alert(prettyPrint(errors, 'str'));
            return;
        }

        setFacilities(items);
    }

    const getApartment = async () => {
        const { status, errors, payload } = await apartmentsService.getApartment(id, 'full');

        if (status > 299) {
            // TODO replace to modal
            alert(prettyPrint(errors, 'str'));
            return;
        }

        setApartment(payload);
        setPoint({
            longitude: payload.longitude,
            latitude: payload.latitude
        })
    }

    const getDraft = async () => {
        const { status, errors, payload } = await apartmentsService.getDraft(id);

        if (status > 299 && status !== 404) {
            // console.log(status)
            // TODO replace to modal
            alert(prettyPrint(errors, 'str'));
            return;
        }

        setUpdateApartment(payload);
    }

    const updateDraft = (key, value) => {
        if (value === null) {
            setDraftApartment(prev => ({
                ...prev,
                [key]: apartment[key]
            }))
        } else {
            setDraftApartment(prev => ({
                ...prev,
                [key]: value
            }))
        }

        setDraft(prev => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        getAtartmentsTypes();
        getFacilities();
        getApartment();
        getDraft();
    }, []);

    useEffect(() => {
        if (apartment !== null && updateApartment !== null && updateApartment !== undefined) {
            const tmp = {
                ...apartment,
                ...updateApartment
            }

            let checklist = [...apartment.checklist]
            if (updateApartment.checklist !== undefined) {
                if (updateApartment.checklist.create !== undefined) {
                    updateApartment.checklist.create.map(el => checklist.push({
                        id: el.checklist_id,
                        name: el.name
                    }));
                }
                if (updateApartment.checklist.delete !== undefined) {
                    updateApartment.checklist.delete.map(del => checklist = checklist.filter(el => el.id !== del));
                }
                tmp.checklist = checklist;
            }

            let images = [...apartment.images]
            if (updateApartment.images !== undefined) {
                if (updateApartment.images.created !== undefined) {
                    updateApartment.images.created.map(el => images.push({
                        ...el,
                        draft: true
                    }));
                }
                if (updateApartment.images.deleted !== undefined) {
                    updateApartment.images.deleted.map(del => images = images.filter(el => el.id !== del.id));
                }
                tmp.images = images;
            }


            prettyPrint(tmp)
            setDraftApartment({ ...tmp })
        } else
            setDraftApartment(apartment);
    }, [apartment, updateApartment]);

    const onAddImages = (images) => {
        setNewImages(prev => [...prev, ...images.map(el => ({
            name: 'image.jpg',
            type: el.mime,
            uri: el.path,
            isFile: true
        }))]);
    }

    const onDeleteImage = (image) => {
        if (image.id !== undefined) {
            if (image.draft !== undefined && image.draft === true)
                setDeleteNewImagesIds(prev => [...prev, image.id]);
            else
                setDeleteImageIds(prev => [...prev, image.id])
        }
    }

    const saveDraft = async () => {
        const options = {};
        let checklist_ = [];

        for (const key of Object.keys(draft)) {
            if (apartment[key] !== draft[key])
                options[key] = draft[key];
            else if (apartment[key] === draft[key])
                options[key] = null;
        }

        const ids = draftApartment.checklist.map(el => el.id)

        if (draft.checklist.filter(el => !ids.includes(el)).length !== 0 ||
            draft.checklist.length !== ids.length) {
            checklist_ = draft.checklist;
            console.log(checklist_)
        }

        if (Object.keys(options).length > 0) {
            delete options.checklist;
            delete options.images;
            const { errors, status } = await apartmentsService.updateApartment(id, options);

            if (status !== 204) {
                // TODO replace to modal
                console.log(status, 'update apartment')
                alert(prettyPrint(errors, 'str'));
            }
        }

        if (checklist_.length > 0) {
            const { errors, status } = await apartmentsService.updateApartmentChecklist(id, {
                checklist: checklist_
            })

            if (status !== 204) {
                // TODO replace to modal
                console.log(status, 'update checklist')
                alert(prettyPrint(errors, 'str'));
            }
        }

        if (deleteImageIds.length > 0) {
            const { errors, status } = await apartmentsService.deleteApartmentImages(id, deleteImageIds);

            if (status !== 204) {
                // TODO replace to modal
                console.log(status, 'delete images');
                alert(prettyPrint(errors, 'str'));
            }
        }

        if (newImages.length > 0) {
            // TODO add in repository

            console.log({ image: newImages })
            prettyPrint({ images: newImages })
            const { errors, status } = await apartmentsService.addApartmentNewImages(id, { files: newImages });

            if (status !== 204) {
                // TODO replace to modal
                console.log(status, 'add images');
                alert(prettyPrint(errors, 'str'));
            }
        }

        if (deleteNewImagesIds > 0) {
            const { errors, status } = await apartmentsService.deleteApartmentNewImages(id, deleteNewImagesIds);

            if (status !== 204) {
                // TODO replace to modal
                console.log(status, 'delete new images');
                alert(prettyPrint(errors, 'str'));
            }
        }

        setPopupText('Изменения сохранены, ожидается проверка администатора');
        setPopup(true);
    }

    // prettyPrint(draftApartment)
    // prettyPrint(apartment)
    // prettyPrint(draft)

    return (
        <Container>
            <ScreenHeader
                header='Редактирование'
                onBackPress={() => {
                    if (!firstStep) setFirstStep(true);
                    else navigation.goBack()
                }}
            />
            {draftApartment ?
                <>
                    <ScrollView
                        style={{
                            flex: 1,
                            display: firstStep ? 'flex' : 'none',
                            ...styles.rootView
                        }}
                    >
                        {updateApartment &&
                            <InfoMessage
                                data='Есть черновик'
                                icon={<Icon
                                    name='alert-circle'
                                    size={30}
                                    color='#fff'
                                />}
                            />
                        }
                        <View
                            style={styles.categoriesView}
                        >
                            {apartmentsTypes.map(el =>
                                <Category
                                    key={`${el.id}`}
                                    selected={el.id === draftApartment.category.id}
                                    categories={apartmentsTypes}
                                    name={el.name}
                                    onPress={() => {
                                        // setSelectedType(el.id);
                                        updateDraft('apartment_category_id', el.id);
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.line} />
                        <ApartmentData
                            cancel={true}
                            options={draftApartment}
                            // setOptions={setOptions}
                            updateOptions={updateDraft}
                        />
                        <Facilities
                            options={draftApartment}
                            facilities={facilities}
                            setOptions={setDraft}
                        />
                        <Address
                            point={point}
                            price={draftApartment.price}
                            onPress={() => setFirstStep(false)}
                        />
                        <FileUploader
                            values={draftApartment.images}
                            onAddImages={onAddImages}
                            onDelete={onDeleteImage}
                        />
                        <Button
                            placeholder='Вернуть удаленныe изображения'
                            onPress={async () => {
                                const { status, errors } = await apartmentsService.cancelApartmentDeletedImages(id, [])
                                prettyPrint({
                                    status,
                                    ...errors
                                })
                            }}
                            style={{
                                marginBottom: 10
                            }}
                        />
                        <Button
                            placeholder='Сохранить'
                            onPress={() => saveDraft()}
                        />
                    </ScrollView>
                    <SelectOnMap
                        style={{
                            flex: 1,
                            display: firstStep ? false : true
                        }}
                        display={!firstStep}
                        price={draft.price || draftApartment.price}
                        point={point}
                        onPointChange={(point) => {
                            setDraftApartment(prev => ({
                                ...prev,
                                longitude: point.longitude,
                                latitude: point.latitude
                            }));
                            setPoint(point);
                        }}
                        confirm={() => setFirstStep(true)}
                    />
                </>
                :
                <Preloader />
            }
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
    )
}

export { EditApartmentScreen };