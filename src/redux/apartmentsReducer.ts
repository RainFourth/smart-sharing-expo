import {Action} from "redux";
import {ErrorType} from "@se/utils";
import {
    getCities,
    getApartments,
    getDistricts,
    getStreets, City, Street, District, Apartment, Place
} from "@se/apartmentsService2";

type apartmentsActionTypes = 'setCities' | 'setSelectedCity' | 'setApartmentsInCity'
    | 'setGroupedApartments' | "setDistricts" | "setStreets"
    | 'setAddressFilter' | 'setSelectedApartments'
export type ApartmentActionType = Action<apartmentsActionTypes> & { payload: any }


export type GroupedApartments = {
    ids: string[]
    minPrice: number
    exact: boolean
    coordinates: {
        latitude: number
        longitude: number
    }
}



export type ApartmentsStateType = {
    cities: {
        data: undefined|City[]
        error: undefined|ErrorType
    }
    selectedCity: {
        city: City|undefined

        apartments: {
            error: undefined|ErrorType
            data: undefined | Apartment[]
        }
        groupedApartments: undefined | GroupedApartments[]

        districts: {
            error: undefined | ErrorType
            data: undefined | District[]
        }
        streets: {
            error: undefined | ErrorType
            data: undefined | Street[]
        }

        addressFilter: Place[]

        selectedApartmentIds: { idsSet: Set<string>} // ids
    }
}
const initState: ApartmentsStateType = {
    cities: {
        data: undefined,
        error: undefined
    },
    selectedCity: {
        city: undefined,

        apartments: {
            data: undefined,
            error: undefined
        },
        groupedApartments: undefined,

        districts: {
            data: undefined,
            error: undefined,
        },
        streets: {
            data: undefined,
            error: undefined,
        },

        addressFilter: [],

        selectedApartmentIds: { idsSet: new Set<string>() },
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
            state.selectedCity.selectedApartmentIds.idsSet.clear()
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
            const idsSet = state.selectedCity.selectedApartmentIds.idsSet
            idsSet.clear()
            return {...state, selectedCity: {
                ...state.selectedCity,
                addressFilter: action.payload,
                selectedApartmentIds: { idsSet }
            }}
        case "setSelectedApartments": return {...state, selectedCity: {
                ...state.selectedCity,
                selectedApartmentIds: action.payload
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
export const setApartmentsInCity = (apartments: ApartmentsStateType['selectedCity']['apartments']): ApartmentActionType => ({
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
export const setSelectedApartments = (idsSet: ApartmentsStateType['selectedCity']['selectedApartmentIds']['idsSet']): ApartmentActionType => ({
    type: 'setSelectedApartments', payload: { idsSet }
})


// Thunk Creators
export const fetchCities = () => async (d) => {
    const { error, data } = await getCities()
    d(setCities({ error, data }))
}
export const fetchApartmentsInCity = (cityId: string) => async (d) => {
    const { error, data } = await getApartments({ city_id: cityId })
    d(setApartmentsInCity({ error, data }))
}
export const fetchDistricts = (cityId: string) => async (d) => {
    const { error, data } = await getDistricts(cityId)
    d(setDistricts({ error, data }))
}
export const fetchStreets = (cityId: string) => async (d) => {
    const { error, data } = await getStreets(cityId)
    d(setStreets({ error, data }))
}
export const updateApartment = (apartmentId: string, isFavorite: boolean) => async (d) => {

}