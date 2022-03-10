
import {StyleSheet} from "react-native";




// Style Global
export const sg = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    flex: {
        flex: 1
    },
    transparent: {
        backgroundColor: '#00000000'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    }
})