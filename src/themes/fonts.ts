export const fonts = {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semibold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
}


// normal - 400
// bold - 700
export type FontType = {
    w100: string                    // Thin
    w200: string                    // ExtraLight
    w300: string                    // Light
    w400: string, normal: string    // Regular
    w500: string                    // Medium
    w600: string                    // SemiBold
    w700: string, bold: string      // Bold
    w800: string                    // Black
    w900: string                    // Super
}
export const fonts2 = {
    montserrat: {
        w100: 'Montserrat-Thin',
        w200: 'Montserrat-ExtraLight',
        w300: 'Montserrat-Light',
        w400: 'Montserrat-Regular', normal: 'Montserrat-Regular',
        w500: 'Montserrat-Medium',
        w600: 'Montserrat-SemiBold',
        w700: 'Montserrat-Bold', bold: 'Montserrat-Bold',
        w800: 'Montserrat-Black',
        w900: '',
    },
} as {[prop: string]: FontType}