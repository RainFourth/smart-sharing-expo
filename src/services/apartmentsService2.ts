import * as apartmentsRepoMock from "@r/apartmentsRepoMock";
import { ServiceData } from "@se/servicesUtils";
import { ApartmentCoordinatesType, CityType, DistrictType, StreetType } from "@r/apartmentsRepoMockData";



export type ServiceCities = ServiceData<CityType[]>
export const getCities = async (): Promise<ServiceCities> => {
    return apartmentsRepoMock.getCities().then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, data: undefined }
            }

            return { error: undefined, data: payload }
        }, error => {
            return { error: { code: 'error' }, data: undefined }
        }
    )
}



export type ServiceDistricts = ServiceData<DistrictType[]>
export const getDistricts = async (cityId: number): Promise<ServiceDistricts> => {
    return apartmentsRepoMock.getDistricts(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, data: undefined }
            }

            return { error: undefined, data: payload.items }
        }, error => {
            return { error: { code: 'error' }, data: undefined }
        }
    )
}


export type ServiceStreets = ServiceData<StreetType[]>
export const getStreets = async (cityId: number): Promise<ServiceStreets> => {
    return apartmentsRepoMock.getStreets(cityId).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, data: undefined }
            }

            return { error: undefined, data: payload.items }
        }, error => {
            return { error: { code: 'error' }, data: undefined}
        }
    )
}


export type ServiceCoords = ServiceData<ApartmentCoordinatesType[]>
export const getCoordinates = async (options: {city_id: number}): Promise<ServiceCoords> => {
    return apartmentsRepoMock.getCoordinates(options).then(
        response => {
            const { status, errors, payload, error } = response

            if (status >= 300){
                return { error: { code: 'error' }, data: undefined }
            }

            return { error: undefined, data: payload.items }
        }, error => {
            return { error: { code: 'error' }, data: undefined }
        }
    )
}



