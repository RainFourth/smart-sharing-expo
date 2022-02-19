import {
    useContext, useMemo,
    useEffect, useState
} from "react";
import { Appearance } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext, prettyPrint } from "@u";
import {darkTheme, lightTheme, ThemeType} from '@t'

const themesMap = {
    light: lightTheme,
    dark: darkTheme
}
export type ThemeName = keyof typeof themesMap



// todo от темы должен зависеть цвет Preloading (хотя бы 2: светлый и тёмный)


function loadTheme() {
    // todo make public const (redux/saga) with theme name
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
}

function useTheme<T>(fn: (theme: ThemeType)=>T, dependencies: any[] = []) {
    const { theme } = useContext(AppContext);
    const themeObj = useMemo(() => themesMap[theme], [theme]);
    const result = useMemo(() => fn(themeObj), [theme, ...dependencies]);

    return result;
}

function useThemeObj(){
    const { theme } = useContext(AppContext);
    const themeObj = useMemo(() => themesMap[theme], [theme]);

    return themeObj;
}

// todo
/*function useThemeNew(){
    const [themeName, setThemeName] = useState(undefined as ThemeName|undefined)

    const load = ()=>{

    }

    const getName = ()=>{
        return ""
    }
    const setName = (name: string)=>{

    }
    const getTheme = ()=>{
        return lightTheme
    }

    return { getName, setName, getTheme }
}*/

export { /*useThemeNew,*/ useTheme, useThemeObj, loadTheme };