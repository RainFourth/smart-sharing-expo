import { colors } from './colors';
import { fonts } from './fonts';
import {ThemeType} from "./themeType";

export const lightTheme: ThemeType = {
    font: {
        family: fonts.family,
        familyBold: fonts.familyBold,
        color: colors.dark0,
        headerColor: colors.dark3,
        separatorColor: colors.dark2,
        errorColor: colors.red1,
        linkColor: colors.darker,
        ratingColor: colors.darker,
        cityColor: colors.light4,
        letterSpacing0: -0.24,
        letterSpacing1: -0.41,
        letterSpacing2: -0.8,
        letterSpacing3: 0.12,
        letterSpacing4: 0.41
    },
    backgroundColor: {
        mainColor: colors.light4,
    },
    preloader: {
        spinnerColor: colors.mainColor
    },
    button: {
        backgroundColor: {
            main: colors.mainColor,
            active: colors.darker,
            disabled: colors.lighter,
            card: colors.lighter,
            picker: '#000000'
        },
        textColor: {
            main: colors.light4,
            active: colors.light4,
            disabled: colors.mainColor,
            card: colors.darker,
            picker: colors.light4
        },
        letterSpacing: -0.24
    },
    category: {
        selected: {
            backgroundColor: colors.lighter,
            textColor: colors.mainColor
        },
        backgroundColor: colors.light2,
        textColor: colors.dark0,
        letterSpacing: -0.24
    },
    carousel: {
        backgroundColor: colors.lighter,
        index: {
            backgroundColor: colors.dark4,
            letterSpacing: 13.62,
            textColor: colors.light4
        }
    },
    facility: {
        // TODO design background color
        backgroundColor: colors.light2,
        iconColor: colors.dark0,
        textColor: colors.dark0,
        letterSpacing: 0.12
    },
    infoMessage: {
        error: {
            backgroundColor: colors.red2,
            textColor: colors.light4
        },
        letterSpacing: -0.24
    },
    marker: {
        selected: {
            backgroundColor: colors.medium,
            textColor: colors.light4
        },
        backgroundColor: colors.light4,
        textColor: '#606060',
        circleColor: '#6041FF',
        shadowCircleColor: '#7B61FF',
        font: 'OpenSans-SemiBold'
    },
    mapSearch: {
        textColor: colors.dark0,
        letterSpacing: -0.24
    },
    modalMessage: {
        error: {
            backgroundColor: colors.red2,
            textColor: colors.light4
        },
        backgroundColor: colors.medium,
        letterSpacing: -0.24
    },
    popup: {
        error: {
            backgroundColor: colors.red2,
            textColor: colors.light4
        },
        textColor: colors.light4,
        backgroundColor: colors.medium,
        letterSpacing: -0.24
    },
    review: {
        avatar: {
            iconColor: colors.dark0,
            backgroundColor: colors.light2
        },
        textColor: colors.dark0,
        ratingColor: colors.mainColor,
        letterSpacing: -0.24,
        dateColor: colors.dark4,
        dateLetterSpacing: 0.12
    },
    input: {
        checkbox: {
            selected: {
                color: '#5E30E6'
            },
            color: '#CCC7D9'
        },
        rating: {
            track: {
                backgroundColor: '#E5E5E5',
                selectedColor: colors.medium
            }
        }
    },
    calendar: {
        busy: colors.red2,
        partlyBusy: colors.red3,
        today: colors.lighter
    },
    notification: {
        backgroundColors: {
            success: '#28a745',
            danger: '#dc3545',
            info: '#17a2b8',
            default: '#007bff',
            warning: '#eab000'
        },
        title: {
            letterSpacing: 0.41,
        },
        description: {
            letterSpacing: -0.24
        },
        textColor: colors.light4,
    },
    colors
};