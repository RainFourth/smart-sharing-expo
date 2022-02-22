import {ThemeType} from "./themeType";
//import { fonts } from "./fonts";
import {lightTheme} from "./lightTheme";
import {colors} from "@t/colors";


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
        accent: colors.primaryMedium,

        bgcElem: colors.gray,

        bgc: colors.light0,

        bgcAccent: colors.darkBgc,
        onBgcAccent: 'white',
    },
    backgroundColor: {
        mainColor: colors.darkBgc
    }
}