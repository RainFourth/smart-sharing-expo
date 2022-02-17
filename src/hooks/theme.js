import {
    useContext, useMemo,
    useEffect, useState
} from "react";
import { Appearance } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext, prettyPrint } from "@u";
import { darkTheme, lightTheme } from '@t'

const themesMap = {
    light: lightTheme,
    dark: darkTheme
}

function loadTheme() {
    const [theme, setTheme] = useState('light');

    const setTheme_ = async (theme) => {
        await AsyncStorage.setItem('theme', theme);
        setTheme(theme);
    }

    const load = async () => {
        const themeStorage = await AsyncStorage.getItem('theme');

        if (themeStorage) {
            setTheme_(themeStorage);
            return;
        }

        const userTheme = 'light';

        // TODO dark theme
        // const userTheme = Appearance.getColorScheme();
        // await AsyncStorage.setItem('theme', userTheme);
        await setTheme_(userTheme);
    }

    useEffect(() => {
        load();
    }, [])

    return [theme, setTheme_];
}

function useTheme(fn, dependencies = []) {
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

export { useTheme, useThemeObj, loadTheme };