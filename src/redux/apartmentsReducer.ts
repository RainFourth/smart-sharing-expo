import {Action} from "redux";
import {ErrorType} from "@se/servicesUtils";
import {
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
    | 'setAddressFilter' | 'setSelectedApartments'
export type ApartmentActionType = Action<apartmentsActionTypes> & { payload: any }


export type GroupedApartments = {
    ids: number[]
    minPrice: number
    exact: boolean
    coordinates: {
        latitude: number
        longitude: number
    }
}

export type ApartmentsStateType = {
    cities: {
        cities: undefined|CityType[]
        error: undefined|ErrorType
    }
    selectedCity: {
        city: CityType

        apartments: {
            error: undefined|ErrorType
            apartments: undefined | ApartmentCoordinatesType[]
        }
        groupedApartments: undefined | GroupedApartments[]

        districts: {
            error: undefined | ErrorType
            districts: undefined | DistrictType[]
        }
        streets: {
            error: undefined | ErrorType
            streets: undefined | StreetType[]
        }

        addressFilter: PlaceType[]

        selectedApartments: { idsSet: Set<number>} // ids
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

        selectedApartments: { idsSet: new Set<number>() },
    },

}



const apartmentsReducer = (state = initState, action: ApartmentActionType) => {
    switch (action.type){
        case "setCities": return {...state, cities: action.payload}
        case "setSelectedCity": return {...state, selectedCity: {
                ...initState.selectedCity,
                city: action.payload,
            }}
        case "setApartmentsInCity":
            state.selectedCity.selectedApartments.idsSet.clear()
            return {...state, selectedCity: {
                ...state.selectedCity,
                apartments: action.payload,
                groupedApartments: undefined,
                addressFilter: []
            }}
        case "setGroupedApartments":
            return {...state, selectedCity: {
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
        case "setAddressFilter":
            const idsSet = state.selectedCity.selectedApartments.idsSet
            idsSet.clear()
            return {...state, selectedCity: {
                ...state.selectedCity,
                addressFilter: action.payload,
                selectedApartments: { idsSet }
            }}
        case "setSelectedApartments": return {...state, selectedCity: {
                ...state.selectedCity,
                selectedApartments: action.payload
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
export const setSelectedApartments = (idsSet: ApartmentsStateType['selectedCity']['selectedApartments']['idsSet']): ApartmentActionType => ({
    type: 'setSelectedApartments', payload: { idsSet }
})


// Thunk Creators
export const fetchCities = () => async (d) => {
    const { error, data } = await getCities()
    d(setCities({error, cities: data}))
}
export const fetchApartmentsInCity = (cityId: number) => async (d) => {
    const { error, data } = await getCoordinates({city_id: cityId})
    d(setApartmentsInCity({ error, apartments: data }))
}
export const fetchDistricts = (cityId: number) => async (d) => {
    const { error, data } = await getDistricts(cityId)
    d(setDistricts({error, districts: data}))
}
export const fetchStreets = (cityId: number) => async (d) => {
    const { error, data } = await getStreets(cityId)
    d(setStreets({error, streets: data}))
}