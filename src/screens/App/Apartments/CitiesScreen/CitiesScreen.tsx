import {StyleSheet, View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform} from "react-native";
import {useThemeNew} from "@h";
import {ThemeType} from "@t";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "@rx/store";
import SearchWidget from "@sc/App/Apartments/CitiesScreen/SearchWidget";
import {sg} from "@u2/styleGlobal";
import Space from "@c/Space";
import {defaultComparator, emptyFun} from "@u2/utils";
import React, {useCallback, useEffect, useState} from "react";
import {useDebounce} from "@h/useDebounce";
import Spinner from "@c/Spinner";
import {fetchCities, setSelectedCity} from "@rx/apartmentsReducer";
import {prettyPrint} from "@u";
import {useNavigation} from "@react-navigation/native";
import SelectAnim from "@c/SelectAnim";
import NamedStyles = StyleSheet.NamedStyles;
import {CityType} from "@r/apartmentsRepoMockData";




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
        fontSize: 17,
        color: t.mainColors.secondary0
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
        flex:1, justifyContent: 'center', paddingStart: 24,
    },
    cityName: {
        fontFamily: t.font.font.normal,
        fontSize: 16,
        color: t.mainColors.secondary0
    }
})


type CityItemProps = {
    city: CityType
    capitalLetter: string|undefined
    onCitySelect: (city: CityType) => void
    s: NamedStyles<any>
    key?: any
}
const CityItem = ({
    city, capitalLetter, onCitySelect = emptyFun, s
}: CityItemProps) => {

    /*const [animMode, setAnimMode] = useState(undefined as undefined|'start'|'end')*/


    const pressable = <View>
        {/*<SelectAnim mode={animMode}/>*/}
        <Pressable
            style={[sg.row, s.cityView]}
            onPress={() => onCitySelect(city)}

            /*onTouchStart={()=>setAnimMode('start')}
            onTouchEnd={()=>setAnimMode('end')}
            onPressIn={()=>console.log('press in')}
            onPressOut={()=>console.log('press out')}*/

        >
            <View style={s.cityIcon}></View>
            <View style={s.cityNameBox}><Text style={s.cityName}>{city.name}</Text></View>
        </Pressable>
    </View>

    return capitalLetter ?
        <View>
            <View style={s.cityView} key={capitalLetter}>
                <Text style={s.cityCapitalLetter}>{capitalLetter}</Text>
            </View>
            {pressable}
        </View>
        :
        pressable

}



const CitiesScreen = () => {
    const { style:s, themeObj } = useThemeNew(makeStyle)
    const { appNav: { bottomBarHeight } } = useSelector((s:StateType)=>s.app)
    const d = useDispatch()

    const { cities, error: citiesErr } = useSelector((s:StateType)=>s.apartments.cities)

    useEffect(()=>{d(fetchCities())},[])

    const [search, setSearch] = useState('')
    const [selectedCities, setSelectedCities] = useState(cities)
    useDebounce(
        ()=>setSelectedCities(cities?.filter(c=>new RegExp(search,'i').test(c.name))),
        500,
        [cities,search]
    )

    useEffect(()=>{
        if (citiesErr) alert('Ошибка загрузки городов\n'+prettyPrint(citiesErr,'str'))
    },[citiesErr])

    const nav = useNavigation()

    const onCitySelect = (city: CityType) => {
        d(setSelectedCity(city))
        // @ts-ignore
        nav.navigate('MapScreen')
    }

    return <View style={[sg.absolute, sg.column, s.mainBox]}>
        <Space h={64}/>
        <Text style={s.citiesHeader}>Города</Text>
        <Space h={24}/>
        <SearchWidget value={search} setValue={setSearch}/>
        <Space h={24}/>

        {
            selectedCities ?
                <KeyboardAvoidingView style={{flex:1}} behavior={'padding'}>
                    <ScrollView style={s.citiesList} keyboardShouldPersistTaps='always'>
                        <Space h={12}/>

                        {function () {
                            let lastLetter = undefined as string | undefined
                            return selectedCities
                                .sort((o1, o2) => defaultComparator(o1.name, o2.name))
                                .map(city => {
                                    const ll = city.name.substr(0, 1).toUpperCase()
                                    const first = ll !== lastLetter
                                    if (first) lastLetter = ll
                                    // @ts-ignore
                                    return <CityItem key={city.id + (first ? ll : 0)}
                                                     city={city}
                                                     capitalLetter={first ? ll : undefined}
                                                     onCitySelect={onCitySelect}
                                                     s={s}
                                    />
                                })
                        }()}


                        <Space h={12}/>
                        <Space h={bottomBarHeight}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            :
                <>
                    <View style={[sg.flex, sg.centerContent]}><Spinner color={themeObj.mainColors.accent1} size={50}/></View>
                    <Space h={bottomBarHeight}/>
                </>

        }

    </View>
}
export default CitiesScreen