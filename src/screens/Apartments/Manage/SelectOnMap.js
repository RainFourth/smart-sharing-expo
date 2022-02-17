import React, {
    useContext, useRef,
    useState, useEffect
} from 'react';
import {
    View, Dimensions,
    StyleSheet
} from 'react-native'
import MapView, { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/Feather';

import {
    MapMarker, Button,
    Popup
} from '@c';
import { AppContext } from '@u'

const dimensions = Dimensions.get("window");
const { width: FULL_WIDTH } = dimensions;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        width: FULL_WIDTH - 40
    }
})

function SelectOnMap({
    display = false, price = null, point = null,
    onPointChange = () => { }, confirm = () => { }
}) {
    const { user } = useContext(AppContext);

    const mapRef = useRef(null);
    const [modal, setModal] = useState(false);

    const [point_, setPoint] = useState(null);

    useEffect(() => {
        mapRef.current.setCamera({
            zoom: 16,
            center: {
                latitude: point ? point.latitude : user.work_city.lat,
                longitude: point ? point.longitude : user.work_city.lon
            }
        })
    }, [display])

    useEffect(() => {
        setPoint(point)
    }, [point])

    useEffect(() => {
        if (point_) {
            mapRef.current.animateCamera({
                center: point_
            });
        }
    }, [point_])

    return (
        <>
            <View
                style={{
                    flex: 1,
                    display: display ? 'flex' : 'none',
                }}
            >
                <MapView
                    ref={mapRef}
                    style={{
                        flex: 1
                    }}
                    onPress={({ nativeEvent: { coordinate } }) => setPoint(coordinate)}
                >
                    {point_ &&
                        <Marker
                            coordinate={point_}
                        >
                            <MapMarker
                                price={price}
                                selected={true}
                            />
                        </Marker>
                    }
                </MapView>
                <Button
                    style={styles.button}
                    placeholder='Подтвердить'
                    onPress={() => {
                        if (point_) {
                            onPointChange(point_);
                            confirm();
                            return;
                        }
                        setModal(true)
                    }}
                />
            </View >
            <Popup
                visible={modal}
                setVisible={setModal}
                text='Вы не вибрали дом на карте.'
                icon={<Icon
                    name='alert-circle'
                    size={30}
                    color='#fff'
                />}
            />
        </>
    )
}

export { SelectOnMap };