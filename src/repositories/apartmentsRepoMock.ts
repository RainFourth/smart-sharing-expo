import {wait} from "@u2/utils";
import {apartmentsCoordinates, cities, districts, streets} from "@r/apartmentsRepoMockData";


export const getCities = () => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: cities
    }

    return wait(1000,response);
}


export const getDistricts = async (cityId: number) => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: districts.filter(d=>d.cityId===cityId)
        }
    }
    return wait(1000, response)
}


export async function getStreets(cityId: number) {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: streets.filter(s=>s.city_id===cityId)
        },
    }
    return wait(1000, response)
}


export const getCoordinates = async (options: {city_id: number}) => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: apartmentsCoordinates.filter(c=>c.city_id===options.city_id)
        }
    }
    return wait(1000, response)
}


