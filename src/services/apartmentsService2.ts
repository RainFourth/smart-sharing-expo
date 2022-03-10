import * as apartmentsRepoMock from "@r/apartmentsRepoMock";
import {ErrorOrData} from "@se/error";
import {ApartmentCoordinatesType, CityType, DistrictType, StreetType} from "@r/apartmentsRepoMockData";



export type FetchedCities = ErrorOrData<{cities: CityType[]}>
export const getCities = async (): Promise<FetchedCities> => {
    return apartmentsRepoMock.getCities().then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' } }
            }

            return { cities: payload }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}



export type FetchedDistricts = ErrorOrData<{districts: DistrictType[]}>
export const getDistricts = async (cityId: number): Promise<FetchedDistricts> => {
    return apartmentsRepoMock.getDistricts(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' } }
            }

            return { districts: payload.items }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}


export type FetchedStreets = ErrorOrData<{streets: StreetType[]}>
export const getStreets = async (cityId: number): Promise<FetchedStreets> => {
    return apartmentsRepoMock.getStreets(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' } }
            }

            return { streets: payload.items }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}


export type FetchedCoordinates = ErrorOrData<{apartmentsCoordinates: ApartmentCoordinatesType[]}>
export const getCoordinates = async (options: {city_id: number}): Promise<FetchedCoordinates> => {
    return apartmentsRepoMock.getCoordinates(options).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' } }
            }

            return { apartmentsCoordinates: payload.items }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}



