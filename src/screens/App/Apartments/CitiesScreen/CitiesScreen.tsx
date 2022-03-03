import {StyleSheet, View, Text, ScrollView, Pressable} from "react-native";
import {useThemeNew} from "@h";
import {ThemeType} from "@t";
import {useSelector} from "react-redux";
import {StateType} from "@rx/store";
import SearchWidget from "@sc/App/Apartments/CitiesScreen/SearchWidget";
import {sg} from "@u2/styleGlobal";
import Space from "@c/Space";
import {defaultComparator} from "@u2/utils";



const cities = [
    {
        id: 1,
        name: 'Иркутск',
    },
    {
        id: 2,
        name: 'Ангарск'
    },
    {
        id: 3,
        name: 'Байкальск'
    },
    {
        id: 4,
        name: 'Алупка'
    },
    {
        id: 5,
        name: 'Алушта'
    },
    {
        id: 6,
        name: 'Анапа'
    },
    {
        id: 7,
        name: 'Белгород'
    },
    {
        id: 8,
        name: 'Новосибирск'
    },
    {
        id: 9,
        name: 'Норильск'
    },
]


const makeStyle = (t: ThemeType) => StyleSheet.create({
    mainBox: {
        backgroundColor: t.mainColors.bgc0,
        paddingHorizontal: 16
    },
    citiesHeader: {
        fontSize: 20,
        fontFamily: t.font.font.w500,
        color: t.mainColors.secondary0
    },
    citiesList: {
        marginHorizontal:-16, paddingHorizontal:16
    },
    cityCapitalLetter: {
        fontFamily: t.font.font.bold,
        fontSize: 17
    },

    cityView: {
        height: 51, justifyContent: 'center'
    },
    cityIcon: {
        width: 27, height: 27,
        backgroundColor: t.mainColors.secondary3,
        alignSelf: 'center'
    },
    cityNameBox: {
        flex:1, justifyContent: 'center', paddingStart: 24
    },
    cityName: {
        fontFamily: t.font.font.normal,
        fontSize: 16,
    }
})

const CitiesScreen = () => {
    const { style:s, themeObj } = useThemeNew(makeStyle)
    const { appNav: { bottomBarHeight } } = useSelector((s:StateType)=>s.app)

    return <View style={[sg.absolute, sg.column, s.mainBox]}>
        <Space h={64}/>
        <Text style={s.citiesHeader}>Города</Text>
        <Space h={24}/>
        <SearchWidget />
        <Space h={24}/>

        <ScrollView style={s.citiesList}>
            <Space h={12}/>

            {function (){
                let lastLetter = undefined as string|undefined
                return cities
                    .sort((o1,o2)=>defaultComparator(o1.name,o2.name))
                    .map(city=>{
                    const ll = city.name.substr(0,1).toUpperCase()
                    if (ll !== lastLetter) {
                        lastLetter = ll
                        return <>
                            <View style={s.cityView} key={ll}>
                                <Text style={s.cityCapitalLetter}>{ll}</Text>
                            </View>
                            <Pressable style={[sg.row, s.cityView]} key={city.id}>
                                <View style={s.cityIcon}></View>
                                <View style={s.cityNameBox}><Text style={s.cityName}>{city.name}</Text></View>
                            </Pressable>
                        </>
                    } else return <Pressable style={[sg.row, s.cityView]} key={city.id}>
                        <View style={s.cityIcon}></View>
                        <View style={s.cityNameBox}><Text style={s.cityName}>{city.name}</Text></View>
                    </Pressable>
                })
            }()}

            <Space h={12}/>
            <Space h={bottomBarHeight}/>
        </ScrollView>
    </View>
}
export default CitiesScreen