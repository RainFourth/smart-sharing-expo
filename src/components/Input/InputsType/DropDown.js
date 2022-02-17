import React, {
    useState, useEffect
} from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useTheme } from '@h';

const makeStyles = (theme) => StyleSheet.create({
    main: {
        marginVertical: 15,
        // width: '96%',
        // marginHorizontal: '2%',
        borderColor: '#fff',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 10,
        //     height: 10
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 10,
        // elevation: 5
    },
    dropDownContainerStyle: {
        width: '96%',
        marginHorizontal: '2%',
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    text: {
        fontFamily: theme.font.family,
        letterSpacing: theme.font.letterSpacing1,
        color: theme.font.color,
        fontSize: 17
    }
})

function DropDown({
    items = [], zIndex = 100,
    onChange = () => { },
    mainStyle = {}
}) {
    const styles = useTheme(theme => makeStyles(theme), []);

    const [open, setOpen] = useState(false);

    const [val, setVal] = useState(null);

    useEffect(() => {
        if (val !== null) {
            onChange(val)
        }
    }, [val]);

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <DropDownPicker
                items={items}
                value={val}
                open={open}
                setOpen={setOpen}
                setValue={setVal}
                searchable={false}
                placeholder='Выберите город'
                // placeholderStyle={{

                // }}
                zIndex={zIndex}
                style={{ ...styles.main, ...mainStyle }}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                theme='LIGHT'
                listMode='SCROLLVIEW'
                textStyle={styles.text}
            />
        </View>
    )
}

export { DropDown };