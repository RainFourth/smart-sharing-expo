import { darkTheme, lightTheme, ThemeType } from '@t'
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@rx/store";
import { setTheme as setThemeActionCreator } from "@rx/themeReducer";
import { useMemo } from "react";
import { StyleSheet } from "react-native";


// import { Appearance } from 'react-native';
// TODO dark theme
// const userTheme = Appearance.getColorScheme();
// await AsyncStorage.setItem('theme', userTheme)

// todo от темы должен зависеть цвет Preloading (хотя бы 2: светлый и тёмный)
// todo splash сначала тёмный всегда

const themesMap = {
    light: lightTheme,
    dark: darkTheme
}
export type ThemeName = keyof typeof themesMap


function useThemeNew<T>(styleCreator?: (theme: ThemeType)=>StyleSheet.NamedStyles<T>){
    const { theme, _persist: { rehydrated: themeLoaded }} =
        useSelector<StateType,StateType['theme']>(state => state.theme)
    const d = useDispatch()

    const setTheme = (theme: ThemeName)=>{ d(setThemeActionCreator(theme)) }

    const themeObj = useMemo(()=>themesMap[theme], [theme])

    const style = useMemo(()=>{
        if (styleCreator) return styleCreator(themeObj)
    },[themeObj, styleCreator]) as typeof styleCreator extends undefined ? undefined : StyleSheet.NamedStyles<T>

    return { theme, themeObj, style, setTheme, themeLoaded }
}

export { useThemeNew, useTheme, useThemeObj };










// todo remove this
function useTheme<T>(applyTheme: (theme: ThemeType)=>T, dependencies: any[] = []) {
    const { themeObj } = useThemeNew()
    const result = useMemo(()=>applyTheme(themeObj), [themeObj, ...dependencies]);

    return result;
}

// todo remove this
function useThemeObj(){ return useThemeNew().themeObj }





/*function useTheme<T>(fn: (theme: ThemeType)=>T, dependencies: any[] = []) {
    const { theme } = useContext(AppContext);
    const themeObj = useMemo(() => themesMap[theme], [theme]);
    const result = useMemo(() => fn(themeObj), [theme, ...dependencies]);

    return result;
}*/

/*function useThemeObj(){
    const { theme } = useContext(AppContext);
    const themeObj = useMemo(() => themesMap[theme], [theme]);

    return themeObj;
}*/




//import AsyncStorage from '@react-native-async-storage/async-storage';

/*function loadTheme() {
    const [theme, setTheme] = useState('light' as ThemeName);

    const setTheme2 = (theme: ThemeName) => {
        setTheme(theme);
        AsyncStorage.setItem('theme', theme);
    }

    const load = async () => {
        const themeName = await AsyncStorage.getItem('theme') as ThemeName|undefined;

        if (themeName) {
            setTheme(themeName);
            return;
        }

        // TODO dark theme
        // const userTheme = Appearance.getColorScheme();
        // await AsyncStorage.setItem('theme', userTheme);
    }

    useEffect(() => {
        load();
    }, [])

    return [theme, setTheme2] as [typeof theme, typeof setTheme2];
}*/