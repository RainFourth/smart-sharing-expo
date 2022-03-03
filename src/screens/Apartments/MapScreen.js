import React, {
    useContext, useRef,
    useState, useCallback,
    useEffect, useMemo
} from "react";
import {
    BackHandler, StatusBar,
    Dimensions, View,
    Text, StyleSheet,
    Button, TouchableOpacity,
    ScrollView, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

import { AppContext, splitePrice, Buffer, prettyPrint } from "@u";
import {
    SwipeablePanel, MapSearch,
    InfiniteScroll, ApartmentCard,
    MapMarker, Preloader, Filters
} from "@c";
import {useAuth, useTheme, useThemeNew, useThemeObj} from "@h";

import * as apartmentsService from "@se/apartmentsService";
import {useDispatch, useSelector} from "react-redux";

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;
const FULL_HEIGHT = dimensions.height + StatusBar.currentHeight;

const makeStyles = (theme) => StyleSheet.create({
    map: {
        flex: 1,
        minHeight: 1
    },
    panel: {
        top: 0,
        width: FULL_WIDTH,
        height: FULL_HEIGHT,
        zIndex: 1,
        paddingBottom: 150,

        backgroundColor: theme.backgroundColor.mainColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    panelHeaderView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    panelHeaderFiltersView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    panelHeaderFiltersText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing4,
        color: theme.font.color,
        fontSize: 34,
        flex: 1,
        marginLeft: 20
    },
    panelHeaderFiltersApplyView: {
        flex: 1,
        marginRight: 20,
        alignItems: 'flex-end'
    },
    panelHeaderFiltersApplyText: {
        color: '#898989',
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    panelHeaderText: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.headerColor,
        marginTop: 10,
        fontSize: 17,
    },
    panelHeaderSplitLine: {
        height: 1,
        width: FULL_WIDTH - 40,
        marginTop: 10,
        backgroundColor: theme.colors.line
    },
    handlerLine: {
        height: 5,
        width: 44,
        borderRadius: 100,
        backgroundColor: theme.colors.line
    }
});

function SwipeablePanelHeader(count, filters, selectedIds) {

    //const styles = useTheme(theme => makeStyles(theme), []);
    const { style: styles } = useThemeNew(makeStyles)

    return (
        <View style={styles.panelHeaderView}>
            <View
                style={styles.handlerLine}
            />
            {filters ?
                <View
                    style={styles.panelHeaderFiltersView}
                >
                    <Text
                        style={styles.panelHeaderFiltersText}
                    >
                        Фильтр
                    </Text>
                    {/* <TouchableOpacity
                        style={styles.panelHeaderFiltersApplyView}
                    >
                        <Text
                            style={styles.panelHeaderFiltersApplyText}
                        >Применить</Text>
                    </TouchableOpacity> */}
                </View>
                :
                selectedIds.length === 0 ?
                    <Text style={styles.panelHeaderText}>
                        {`${count} вариантов жилья`}
                    </Text>
                    :
                    <Text style={styles.panelHeaderText}>
                        {`${selectedIds.length} вариантов жилья`}
                    </Text>
            }
            <View style={styles.panelHeaderSplitLine} />
        </View>
    );
}

function MapScreen({
    navigation, /*route: {
        params: {
            id = "ChIJZfbiU9M6qF0RTunYVhTN1jE",
            lat = 52.28771725041251,
            lon = 104.28070340632,
            name: cityName = "Иркутск"
        }
    }*/
}) {

    let id = "ChIJZfbiU9M6qF0RTunYVhTN1jE"
    let lat = 52.28771725041251
    let lon = 104.28070340632
    let name = "Иркутск"


    //const styles = useTheme(theme => makeStyles(theme), []);
    //const themeObj = useThemeObj();
    const { themeObj } = useThemeNew()
    const styles = makeStyles(themeObj)

    //const { user, state, dispatch } = useContext(AppContext);
    const { user } = useAuth()
    const state = useSelector(s=>s.reducer)
    const dispatch = useDispatch()

    const [latLon, setLatLon] = useState({
        latitude: lat,
        longitude: lon
    });

    const buffer = useMemo(() => new Buffer(), []);

    const [options, setOptions] = useState({
        city_id: id
    })

    const [loading, setLoading] = useState(true);

    const [apartmentsCoords, setApartmentsCoords] = useState(null);
    const [apartmentsCount, setApartmentsCount] = useState(0);

    const [filters, setFilters] = useState(false);
    const [filtersOptions, setFiltrsOptions] = useState({});

    const mapRef = useRef(null);
    const [showSearchVariant, setShowSearchVariant] = useState(false);

    const [breakpointIndex, setBreakpointIndex] = useState(2);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedApartments, setSelectedApartments] = useState([]);

    useEffect(() => {
        if (user && user.work_city.id === id) {
            setLatLon(prev => ({
                ...prev,
                latitude: user.work_city.lat,
                longitude: user.work_city.lon
            }))
        }
    }, [user])

    const onMapReady = useCallback(() => {
        // TODO remove timeout
        setTimeout(() =>
            mapRef.current.setCamera({
                zoom: 14,
                center: {
                    latitude: latLon.latitude,
                    longitude: latLon.longitude
                }
            }), 100
        )

        setLoading(false);
    }, [latLon]);

    const onBreakpointChange = useCallback(({ index }) => {
        setBreakpointIndex(index);
    }, []);

    const getPartData = useCallback(async _options => {
        const { status, errors, payload: { items, count } } = await apartmentsService.getList({
            ..._options,
            ...options
        });

        if (status > 299) {
            // TODO replace alert to modal
            alert(errors);

            return [false];
        }

        for (const item of items) {
            item.price = splitePrice(item.price);
            await buffer.addElement(item);
        }

        setApartmentsCount(count);

        let tmp = items.filter(el => el.in_favorites === true);

        if (tmp.length > 0) {
            tmp = tmp.filter(el => Boolean(!state.favorites.find(el1 => el.id === el1.id)))

            dispatch({
                type: 'addFavorites',
                payload: tmp
            })
        }

        return [null, items, count];
    }, [options, !filters]);

    const getData_ = async () => {
        let data = await buffer.getData();
    }

    useEffect(() => {
        getData_();
    }, [options])

    const getCoordinates = useCallback(async options => {
        const { error, payload: { items }, status } = await apartmentsService.getCoordinates(options);

        if (status > 299) {
            // TODO replace to modal
            alert(error);
            return;
        }

        setApartmentsCoords(items);
    }, [])

    useEffect(() => {
        if (options.city_id)
            getCoordinates(options);
    }, [options, !filters]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (breakpointIndex === 2) {
                return false;
            }

            setBreakpointIndex(2);

            return true;
        });

        return () => backHandler.remove();
    }, [breakpointIndex]);

    useEffect(() => {
        if (breakpointIndex == 2 && filters) {
            setFilters(false);
        } else if (breakpointIndex == 2 && selectedIds.length !== 0) {
            setSelectedIds([]);
        }
    }, [breakpointIndex, filters])

    const applyAddress = useCallback((key, option) => {
        let _options = options;

        if (option === null) {
            delete _options[key];
        } else {
            _options[key] = option;
        }

        setOptions(prev => ({ ..._options }));
    }, [options, setOptions])

    const applyFilters = useCallback(() => {
        let _options = filtersOptions;

        for (let key in _options) {
            if (
                _options[key] === undefined ||
                _options[key].length === 0 ||
                (typeof _options[key] !== 'string' && isNaN(_options[key])) ||
                !_options[key]
            ) delete _options[key];
        }

        if (Object.keys(_options).length === 0) {
            setOptions({ city_id: id });
            setFilters(false);
            return;
        }

        setOptions(prev => ({ ..._options, city_id: id }));
        setFilters(false);
    }, [filtersOptions, setOptions, setFilters])

    const onPressMarker = async (e) => {
        let data = await buffer.getItems(e.ids);

        if (data.length !== e.ids.length) {
            let tmp = e.ids.filter(id => !Boolean(data.find(el => el.id === id)));

            const { status, error, payload: { items } } = await apartmentsService.getList({
                ids: tmp
            })

            if (status > 299) {
                // TODO replace to modal
                alert(error);

                return;
            }

            if (items.length > 0) {
                dispatch({
                    type: 'addFavorites',
                    payload: items
                })
            }

            data = [...data, ...items];
        }

        setSelectedApartments(data);

        setSelectedIds(e.ids);
        setBreakpointIndex(1);
    }

    return (
        <>
            <StatusBar
                translucent={true}
                barStyle="dark-content"
                animated={true}
                backgroundColor="rgba( 255, 255, 255, 0 )"
            />
            {/* { loading &&
                <Preloader />
            } */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 8.5,
                    longitudeDelta: 8.5,
                }}
                onMapReady={onMapReady}
                preserveClusterPressBehavior={true}
                clusterColor={themeObj.marker.selected.backgroundColor}
                onPress={() => {
                    setSelectedIds([]);
                    setShowSearchVariant(false);
                    Keyboard.dismiss();
                }}
            >
                {apartmentsCoords && apartmentsCoords.map(el =>
                    <Marker
                        key={el.ids[0]}
                        coordinate={{
                            latitude: el.coordinates.latitude,
                            longitude: el.coordinates.longitude
                        }}
                        onPress={() => {
                            onPressMarker(el);
                        }}
                    >
                        <MapMarker
                            ids={el.ids}
                            price={el.minPrice}
                            selected={selectedIds.length > 0 && selectedIds[0] === el.ids[0]}
                        />
                    </Marker>
                )}
            </MapView>

            {/*todo uncomment*/}
            <MapSearch
                city={{ /*cityName,*/ id }}
                onBack={() => navigation.push('ApartmentsCitiesScreen')}
                onFilters={() => {
                    setFilters(true);
                    setBreakpointIndex(0);
                }}
                setFiltrsOptions={setFiltrsOptions}
                applyFilters={applyFilters}
                applyAddress={applyAddress}
                showVariant={showSearchVariant}
                setShowVariant={setShowSearchVariant}
            />






            <SwipeablePanel
                panelStyle={styles.panel}
                header={SwipeablePanelHeader(apartmentsCount, filters, selectedIds)}
                breakpoints={[100, FULL_HEIGHT / 2, FULL_HEIGHT - 110]}
                breakpointIndex={breakpointIndex}
                onBreakpointChange={onBreakpointChange}
            >
                {filters ?
                    <Filters
                        options={filtersOptions} setOptions={setFiltrsOptions}
                        onApply={applyFilters}
                    />
                    :
                    <>
                        <ScrollView
                            style={{
                                display: selectedIds.length === 0 ? 'none' : 'flex'
                            }}
                        >
                            {selectedApartments.map(el =>
                                <ApartmentCard
                                    key={`${el.id}`}
                                    apartment={el}
                                    onMoreDetails={() =>
                                        navigation.push('ApartmentNavigator', {
                                            screen: 'ApartmentScreen',
                                            params: {
                                                id: el.id
                                            }
                                        })
                                    }
                                />
                            )}
                        </ScrollView>
                        <InfiniteScroll
                            getPartData={getPartData}
                            limit={3}
                            style={{
                                display: selectedIds.length !== 0 ? 'none' : 'flex'
                            }}
                            renderItem={({ item }) =>
                                <ApartmentCard
                                    apartment={item}
                                    onMoreDetails={() =>
                                        navigation.push('ApartmentNavigator', {
                                            screen: 'ApartmentScreen',
                                            params: {
                                                id: item.id
                                            }
                                        })
                                    }
                                />
                            }
                            keyExtractor={({ id }) => `${id}`}
                            getItemCount={data => data.length}
                            getItem={(data, i) => data[i]}
                        />
                    </>
                }
            </SwipeablePanel>
        </>
    );
}

export { MapScreen };