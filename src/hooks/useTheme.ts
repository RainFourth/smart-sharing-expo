import {darkTheme, lightTheme, ThemeType} from '@t'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import {setTheme} from "@rx/themeReducer";

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


function useThemeNew(){
    const theme =
        useSelector<StateType,StateType['theme']['theme']>(state => state.theme.theme)
    const themeLoaded =
        useSelector<StateType,StateType['theme']['_persist']['rehydrated']>(state => state.theme._persist.rehydrated)
    const d = useDispatch()

    const set = (theme: ThemeName)=>{ d(setTheme(theme)) }
    const getThemeObj = ()=>themesMap[theme]

    return { theme, set, getThemeObj, themeLoaded }
}

export { useThemeNew, useTheme, useThemeObj };










import { useMemo } from "react";

// todo remove this
function useTheme<T>(applyTheme: (theme: ThemeType)=>T, dependencies: any[] = []) {
    const t = useThemeNew()
    const result = useMemo(() => applyTheme(t.getThemeObj()), [t, ...dependencies]);

    return result;
}

// todo remove this
function useThemeObj(){ return useThemeNew().getThemeObj() }





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