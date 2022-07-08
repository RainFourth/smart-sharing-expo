import {wait} from "@u2/utils";
import {apartmentsCoordinates, cities, districts, streets} from "@r/apartmentsRepoMockData";
import {GraphQlData} from "@se/utils";
import {ax} from "@r/utils";

export type PlaceType = 'country' | 'city' | 'district' | 'street' | 'house' | 'apartment'
export type PlaceSubType = 'страна' | 'город' | 'деревня' | 'район' | 'округ' | 'улица'
| 'переулок' | 'микрорайон' | 'дом' | 'квартира'

export type CountryApi = {
    id: string, name: string,
    placeType: PlaceType, placeSubType: PlaceSubType,
    coordinateLat?: number, coordinateLon?: number
}
export type CityApi = {
    id: string, country: CountryApi, name: string,
    placeType: PlaceType, placeSubType: PlaceSubType,
    coordinateLat: number|null, coordinateLon: number|null,
    imgPath: string|null
}
export type DistrictApi = {
    id: string, city: CityApi, name: string,
    placeType: PlaceType, placeSubType: PlaceSubType,
    coordinateLat: number|null, coordinateLon: number|null
}
export type StreetApi = {
    id: string, city: CityApi, name: string,
    placeType: PlaceType, placeSubType: PlaceSubType,
    coordinateLat: number|null, coordinateLon: number|null
}
export type HouseApi = {
    id: string
    street: StreetApi
    districts: DistrictApi[]
    name: string
    placeType: string
    placeSubType: string
    coordinateLat: number|null
    coordinateLon: number|null
}
export type ApartmentApi = {
    id: string
    house: HouseApi
    name: string
    placeType: string
    placeSubType: string
    coordinateLat: number|null
    coordinateLon: number|null
    price: string|null
    apartmentType: string|null
    rooms: number|null
    area: number|null
    floor: number|null
    //facilities: [Facility]!
    withAnimals: boolean|null
    withChildren: boolean|null
    images: ImageApi[]
    description: string|null
    favoriteLists: FavoriteListApi[]
    //apartmentAppraisals: [ApartmentAppraisal]!
}

export type ImageApi = {
    id: string
    path: string
}
export type FavoriteListApi = {
    id: string,
    name: string|null
}


export const getCities = async () => {
    const response = ax.post<GraphQlData<{ cities: CityApi[] }>>('', {
        query: `{
            cities {
                id, country { id, name }, name, placeType, placeSubType,
                coordinateLat, coordinateLon, imgPath
            }
        }`
    })
    //console.log(response)
    return response
}
/*export const getCities = () => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: cities
    }

    return wait(1000,response);
}*/


// todo make special object with info about filter/sort
export const getDistricts = async (cityId: string) => {
    return ax.post<GraphQlData<{ districts: DistrictApi[] }>>('', {
        query: `{
            districts(cityId: ${cityId}) {
                id, city { id, name }, name, placeType, placeSubType,
                coordinateLat, coordinateLon
            }
        }`
    })
}
/*export const getDistricts = async (cityid: string) => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: districts.filter(d=>d.cityId===cityId)
        }
    }
    return wait(1000, response)
}*/



export const getStreets = async (cityId: string) => {
    return ax.post<GraphQlData<{ streets: StreetApi[] }>>('', {
        query: `{
            streets(cityId: ${cityId}) {
                id, 
                city {
                    id, name, country {
                        id, name
                    }
                }
                name, placeType, placeSubType,
                coordinateLat, coordinateLon
            }
        }`
    })
}
/*export async function getStreets(cityid: string) {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: streets.filter(s=>s.city_id===cityId)
        },
    }
    return wait(1000, response)
}*/



export const getApartments = async (cityId: string) => {
    return ax.post<GraphQlData<{ apartments: ApartmentApi[] }>>('', {
        query: `{
            apartments(cityId: ${cityId}) {
                id
                house { 
                    id, name, placeType, placeSubType
                    street {
                        id, name, placeType, placeSubType
                        city {
                            id, name, placeType, placeSubType
                            country {
                                id, name
                            }
                        }
                    }
                    districts {
                        id, name, placeType, placeSubType
                    }
                }, 
                name, placeType, placeSubType,
                coordinateLat, coordinateLon,
                price, apartmentType, rooms, area, floor,
                withAnimals, withChildren,
                images { id, path }
                description
                favoriteLists { id, name }
            }
        }`
    })
}
/*export const getCoordinates = async (options: {city_id: string}) => {
    const response = {
        error: undefined, errors: [], status: 200,
        payload: {
            items: apartmentsCoordinates.filter(c=>c.city_id===options.city_id)
        }
    }
    return wait(1000, response)
}*/



/*

export const getImage = async (img: { path: string }) => {
    return Axios.create({ baseURL: API_URL })
        .get('image', {
            params: img
        })
}
*/



export const updateFavoriteApartment = async (
    apartmentId: string, favoriteListIds: string[]
) => {
    console.log("favoriteListIds: ",favoriteListIds)
    return ax.post<GraphQlData<{ updateFavoriteApartment: { success: boolean } }>>('', {
        query: `mutation {
            updateFavoriteApartment(
                apartmentId: ${apartmentId}
                favoriteListIds: ${JSON.stringify(favoriteListIds)}
            ) {
                success
            }
        }`
    })
}
