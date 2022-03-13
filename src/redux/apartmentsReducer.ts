import {Action} from "redux";
import {ErrorType} from "@se/error";
import {
    FetchedDistricts,
    FetchedStreets,
    getCities,
    getCoordinates,
    getDistricts,
    getStreets
} from "@se/apartmentsService2";
import {
    ApartmentCoordinatesType,
    CityType,
    defaultCity,
    DistrictType,
    PlaceType,
    StreetType
} from "@r/apartmentsRepoMockData";

type apartmentsActionTypes = 'setCities' | 'setSelectedCity' | 'setApartmentsInCity'
    | 'setGroupedApartments' | "setDistricts" | "setStreets"
    | 'setAddressFilter'
export type ApartmentActionType = Action<apartmentsActionTypes> & { payload: any }


export type ApartmentsStateType = {
    cities: {
        cities: undefined|CityType[]
        error: undefined|ErrorType
    }
    selectedCity: {
        city: CityType

        apartments: {
            error: undefined|ErrorType
            apartments: undefined|ApartmentCoordinatesType[]
        }
        groupedApartments: undefined | {
            ids: number[]
            minPrice: number
            coordinates: {
                latitude: number
                longitude: number
            }
        }[]

        districts: {
            error: undefined | ErrorType
            districts: undefined | DistrictType[]
        }
        streets: {
            error: undefined | ErrorType
            streets: undefined | StreetType[]
        }

        addressFilter: PlaceType[]
    }
}
const initState: ApartmentsStateType = {
    cities: {
        cities: undefined,
        error: undefined
    },
    selectedCity: {
        city: defaultCity,

        apartments: {
            apartments: undefined,
            error: undefined
        },
        groupedApartments: undefined,

        districts: {
            error: undefined,
            districts: undefined
        },
        streets: {
            error: undefined,
            streets: undefined
        },

        addressFilter: [],
    },

}



const apartmentsReducer = (state = initState, action: ApartmentActionType) => {
    switch (action.type){
        case "setCities": return {...state, cities: action.payload}
        case "setSelectedCity": return {...state, selectedCity: {
                ...initState.selectedCity,
                city: action.payload,
            }}
        case "setApartmentsInCity": return {...state, selectedCity: {
                ...state.selectedCity,
                apartments: action.payload,
                groupedApartments: undefined,
                addressFilter: []
            }}
        case "setGroupedApartments": return {...state, selectedCity: {
                ...state.selectedCity,
                groupedApartments: action.payload
            }}
        case "setDistricts": return {...state, selectedCity: {
                ...state.selectedCity,
                districts: action.payload
            }}
        case "setStreets": return {...state, selectedCity: {
                ...state.selectedCity,
                streets: action.payload
            }}
        case "setAddressFilter": return {...state, selectedCity: {
                ...state.selectedCity,
                addressFilter: action.payload
            }}
        default: return state
    }
}
export default apartmentsReducer



// Action Creators
const setCities = (cities: ApartmentsStateType['cities']): ApartmentActionType => ({
    type: "setCities", payload: cities
})
export const setSelectedCity = (city: ApartmentsStateType['selectedCity']['city']): ApartmentActionType => ({
    type: "setSelectedCity", payload: city
})
const setApartmentsInCity = (apartments: ApartmentsStateType['selectedCity']['apartments']): ApartmentActionType => ({
    type: "setApartmentsInCity", payload: apartments
})
export const setGroupedApartments = (apartments: ApartmentsStateType['selectedCity']['groupedApartments']): ApartmentActionType => ({
    type: "setGroupedApartments", payload: apartments
})
const setDistricts = (districts: ApartmentsStateType['selectedCity']['districts']): ApartmentActionType => ({
    type: "setDistricts", payload: districts
})
const setStreets = (streets: ApartmentsStateType['selectedCity']['streets']): ApartmentActionType => ({
    type: "setStreets", payload: streets
})
export const setAddressFilter = (filter: ApartmentsStateType['selectedCity']['addressFilter']): ApartmentActionType => ({
    type: "setAddressFilter", payload: filter
})


// Thunk Creators
export const fetchCities = () => async (d) => {
    const cs = await getCities()
    d(setCities(cs))
}
export const fetchApartmentsInCity = (cityId: number) => async (d) => {
    const { error, apartmentsCoordinates } = await getCoordinates({city_id: cityId})
    d(setApartmentsInCity({ error, apartments: apartmentsCoordinates }))
}
export const fetchDistricts = (cityId: number) => async (d) => {
    const ds = await getDistricts(cityId)
    d(setDistricts(ds))
}
export const fetchStreets = (cityId: number) => async (d) => {
    const st = await getStreets(cityId)
    d(setStreets(st))
}