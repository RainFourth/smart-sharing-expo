import * as apartmentsRepoMock from "@r/apartmentsRepoMock";
import {ErrorOrData} from "@se/error";
import {ApartmentCoordinatesType, CityType, DistrictType, StreetType} from "@r/apartmentsRepoMockData";



export type FetchedCities = ErrorOrData<{cities: CityType[]}>
export const getCities = async (): Promise<FetchedCities> => {
    return apartmentsRepoMock.getCities().then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, cities: undefined }
            }

            return { error: undefined, cities: payload }
        }, error => {
            return { error: { code: 'error' }, cities: undefined }
        }
    )
}



export type FetchedDistricts = ErrorOrData<{districts: DistrictType[]}>
export const getDistricts = async (cityId: number): Promise<FetchedDistricts> => {
    return apartmentsRepoMock.getDistricts(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, districts: undefined }
            }

            return { error: undefined, districts: payload.items }
        }, error => {
            return { error: { code: 'error' }, districts: undefined }
        }
    )
}


export type FetchedStreets = ErrorOrData<{streets: StreetType[]}>
export const getStreets = async (cityId: number): Promise<FetchedStreets> => {
    return apartmentsRepoMock.getStreets(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, streets: undefined }
            }

            return { error: undefined, streets: payload.items }
        }, error => {
            return { error: { code: 'error' }, streets: undefined}
        }
    )
}


export type FetchedCoordinates = ErrorOrData<{apartmentsCoordinates: ApartmentCoordinatesType[]}>
export const getCoordinates = async (options: {city_id: number}): Promise<FetchedCoordinates> => {
    return apartmentsRepoMock.getCoordinates(options).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, apartmentsCoordinates: undefined }
            }

            return { error: undefined, apartmentsCoordinates: payload.items }
        }, error => {
            return { error: { code: 'error' }, apartmentsCoordinates: undefined }
        }
    )
}



