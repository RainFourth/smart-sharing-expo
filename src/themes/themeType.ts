import {MapStyleElement} from "react-native-maps";
import {fonts2, FontType} from "@t/fonts";


export type ThemeType = {
    readonly mainColors: {
        readonly accent: string

        readonly accent0: string
        readonly accent1: string
        readonly accent2: string
        readonly accent3: string

        readonly secondary0: string
        readonly secondary1: string
        readonly secondary2: string
        readonly secondary3: string
        readonly secondary4: string

        readonly bgc0: string
        readonly bgc1: string
        readonly bgc2: string

        readonly onAccent0: string
        readonly onAccent1: string


        readonly bgcElem: string

        readonly bgc: string
        readonly bgcBright: string
        readonly onBgc0: string

        readonly bgcAccent: string
        readonly onBgcAccent: string
    }
    readonly bottomTabBar: {
        color: string
    }
    readonly font: {
        readonly font: FontType

        readonly family: string,
        readonly familyMedium: string
        readonly familyBold: string,

        readonly color: string,
        readonly headerColor: string,
        readonly separatorColor: string,
        readonly errorColor: string,
        readonly linkColor: string,
        readonly ratingColor: string,
        readonly cityColor: string,
        readonly letterSpacing0: number,
        readonly letterSpacing1: number,
        readonly letterSpacing2: number,
        readonly letterSpacing3: number,
        readonly letterSpacing4: number
    },
    readonly backgroundColor: {
        readonly mainColor: string,
    },
    readonly preloader: {
        readonly spinnerColor: string
    },
    readonly button: {
        readonly backgroundColor: {
            readonly main: string,
            readonly active: string,
            readonly disabled: string,
            readonly card: string,
            readonly picker: string
        },
        readonly textColor: {
            readonly main: string,
            readonly active: string,
            readonly disabled: string,
            readonly card: string,
            readonly picker: string
        },
        readonly letterSpacing: number
    },
    readonly category: {
        readonly selected: {
            readonly backgroundColor: string,
            readonly textColor: string
        },
        readonly backgroundColor: string,
        readonly textColor: string,
        readonly letterSpacing: number
    },
    readonly carousel: {
        readonly backgroundColor: string,
        readonly index: {
            readonly backgroundColor: string,
            readonly letterSpacing: number,
            readonly textColor: string
        }
    },
    readonly facility: {
        // TODO design background color
        readonly backgroundColor: string,
        readonly iconColor: string,
        readonly textColor: string,
        readonly letterSpacing: number
    },
    readonly infoMessage: {
        readonly error: {
            readonly backgroundColor: string,
            readonly textColor: string
        },
        readonly letterSpacing: number
    },
    readonly marker: {
        readonly selected: {
            readonly backgroundColor: string,
            readonly textColor: string
        },
        readonly backgroundColor: string,
        readonly textColor: string,
        readonly circleColor: string,
        readonly shadowCircleColor: string,
        readonly font: string
    },
    readonly mapSearch: {
        readonly textColor: string,
        readonly letterSpacing: number
    },
    readonly modalMessage: {
        readonly error: {
            readonly backgroundColor: string,
            readonly textColor: string
        },
        readonly backgroundColor: string,
        readonly letterSpacing: number
    },
    readonly popup: {
        readonly error: {
            readonly backgroundColor: string,
            readonly textColor: string
        },
        readonly textColor: string,
        readonly backgroundColor: string,
        readonly letterSpacing: number
    },
    readonly review: {
        readonly avatar: {
            readonly iconColor: string,
            readonly backgroundColor: string
        },
        readonly textColor: string,
        readonly ratingColor: string,
        readonly letterSpacing: number
        readonly dateColor: string
        readonly dateLetterSpacing: number
    },
    readonly input: {
        readonly checkbox: {
            readonly selected: {
                readonly color: string
            },
            readonly color: string
        },
        readonly rating: {
            readonly track: {
                readonly backgroundColor: string
                readonly selectedColor: string
            }
        }
    },
    readonly calendar: {
        readonly busy: string
        readonly partlyBusy: string
        readonly today: string
    },
    readonly notification: {
        readonly backgroundColors: {
            readonly success: string
            readonly danger: string
            readonly info: string
            readonly default: string
            readonly warning: string
        },
        readonly title: {
            readonly letterSpacing: number
        },
        readonly description: {
            readonly letterSpacing: number
        },
        readonly textColor: string
    },
    readonly mapStyle: MapStyleElement[]
    readonly colors: {[name: string]: string}
}
