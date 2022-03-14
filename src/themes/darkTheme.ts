import {ThemeType} from "./themeType";
//import { fonts } from "./fonts";
import {lightTheme} from "./lightTheme";
import {colors} from "@t/colors";
import {darkMap} from "@t/googleMapStyles";


/*const darkTheme0 = {
    font: {
        family: 'Montserrat-Regular'
    },
    background: colors.dark4,
    buttonText: colors.light4,
    text: colors.light4,
    ...colors
}*/

// todo implement
export const darkTheme: ThemeType = {
    ...lightTheme,
    mainColors: {
        ...lightTheme.mainColors,

        accent3: colors.mainColor,

        secondary0: 'white',
        secondary1: colors.light3,
        secondary2: colors.gray2,
        //secondary3: colors.gray3, //todo
        secondary4: colors.light2,

        bgc0: colors.darkBgc,
        bgc1: colors.darkBgc,
        bgc2: colors.darkBgc,

        onBgc0: 'white',




        accent: colors.primaryMedium,

        bgcElem: colors.darkGray,

        bgc: colors.light0,

        bgcAccent: colors.darkBgc,
        onBgcAccent: 'white',
    },
    backgroundColor: {
        mainColor: colors.darkBgc
    },
    bottomTabBar: {
        color: "rgba(0,0,0,0)"
    },

    mapStyle: darkMap,
}