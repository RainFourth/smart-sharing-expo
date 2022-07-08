import * as apartmentsRepoMock from "@r/apartmentsRepoMock";
import { ServiceData } from "@se/utils";
import {
    ApartmentApi,
    CityApi,
    CountryApi,
    DistrictApi,
    FavoriteListApi,
    HouseApi,
    ImageApi,
    StreetApi
} from "@r/apartmentsRepoMock";
import {empty, isEmpty} from "@u2/utils";



export class Imagee {
    public static fromImageApi(imageApi?: ImageApi|empty){
        if (isEmpty(imageApi)) return undefined
        return new Imagee(imageApi.id, imageApi.path)
    }
    constructor(
        public id?: string,
        public path?: string|null,
    ) { }
}
export class Country {
    public static fromCountryApi(countryApi?: CountryApi|empty){
        const it = countryApi
        if (isEmpty(it)) return undefined
        return new Country(
            it.id, it.name,
            it.placeType as 'country', it.placeSubType as 'страна',
            it.coordinateLat, it.coordinateLon
        )
    }
    constructor(
        public id?: string,
        public name?: string,
        public placeType?: 'country',
        public placeSubType?: 'страна',
        public coordinateLat?: number,
        public coordinateLon?: number,
    ) { }
}
export class City {
    public static fromCityApi(cityApi?: CityApi|empty){
        const it = cityApi
        if (isEmpty(it)) return undefined
        return new City(
            it.id,
            Country.fromCountryApi(it.country),
            it.name, it.placeType as 'city', it.placeSubType as 'город',
            it.coordinateLat as number, it.coordinateLon as number,
            new Imagee(undefined, it.imgPath)
        )
    }
    constructor(
        public id?: string,
        public country?: Country,
        public name?: string,
        public placeType?: 'city',
        public placeSubType?: 'город',
        public coordinateLat?: number|null,
        public coordinateLon?: number|null,
        public image?: Imagee,
    ) {
        this.location = {
            get lat(){ return coordinateLat },
            get lon(){ return coordinateLon },
        }
    }
    location
    get image_path(){ return this.image?.path }
    get type(){ return this.placeType }
    get typeName(){ return this.placeSubType }
}
export class District {
    public static fromDistrictApi(districtApi?: DistrictApi|empty){
        const it = districtApi
        if (isEmpty(it)) return undefined
        return new District(
            it.id,
            City.fromCityApi(it.city),
            it.name, it.placeType as 'district', it.placeSubType as 'район'|'округ',
            it.coordinateLat as number, it.coordinateLon as number,
        )
    }
    constructor(
        public id?: string,
        public city?: City,
        public name?: string,
        public placeType?: 'district',
        public placeSubType?: 'район'|'округ',
        public coordinateLat?: number|null,
        public coordinateLon?: number|null,
    ) { }
    get cityId(){ return this.city?.id }
    get type(){ return this.placeType }
    get typeName(){ return this.placeSubType }
}
export class Street {
    public static fromStreetApi(streetApi?: StreetApi|empty){
        const it = streetApi
        if (isEmpty(it)) return undefined
        return new Street(
            it.id,
            City.fromCityApi(it.city),
            it.name, it.placeType as 'street', it.placeSubType as 'улица'|'переулок'|'микрорайон',
            it.coordinateLat as number, it.coordinateLon as number,
        )
    }
    constructor(
        public id?: string,
        public city?: City,
        public name?: string,
        public placeType?: 'street',
        public placeSubType?: 'улица'|'переулок'|'микрорайон',
        public coordinateLat?: number|null,
        public coordinateLon?: number|null,
    ) { }
    get cityId(){ return this.city?.id }
    get city_id(){ return this.city?.id }
    get type(){ return this.placeType }
    get typeName(){ return this.placeSubType }
}
export class House {
    public static fromHouseApi(houseApi?: HouseApi|empty){
        const it = houseApi
        if (isEmpty(it)) return undefined
        return new House(
            it.id,
            Street.fromStreetApi(it.street),
            it.districts?.map(it=>District.fromDistrictApi(it)),
            it.name, it.placeType as 'house', it.placeSubType as 'дом',
            it.coordinateLat as number, it.coordinateLon as number,
        )
    }
    constructor(
        public id?: string,
        public street?: Street,
        public districts: (District|undefined)[] = [],
        public name?: string,
        public placeType?: 'house',
        public placeSubType?: 'дом',
        public coordinateLat?: number|null,
        public coordinateLon?: number|null,
    ) { }
    get cityId(){ return this.street?.city?.id }
    get city_id(){ return this.street?.city?.id }
    get type(){ return this.placeType }
    get typeName(){ return this.placeSubType }
    get streetId(){ return this.street?.id }
}
export class Apartment {
    public static fromApartmentApi(apartmentApi?: ApartmentApi|empty){
        const it = apartmentApi
        if (isEmpty(it)) return undefined
        return new Apartment(
            it.id,
            House.fromHouseApi(it.house),
            it.name, it.placeType as 'apartment', it.placeSubType as 'квартира',
            it.coordinateLat as number, it.coordinateLon as number,
            it.price,
            it.apartmentType as 'Квартира'|'Дом'|'Койко-место'|'Часть дома'|'Комната'|'Таунхаус',
            it.rooms===-1 ? 'Студия' : it.rooms,
            it.area, it.floor,
            it.images.map(it=>Imagee.fromImageApi(it)!),
            it.favoriteLists.map(it=>FavoriteList.fromFavoriteListApi(it)!)
        )
    }
    clone(){
        return new Apartment(
            this.id, this.house, this.name, this.placeType, this.placeSubType,
            this.coordinateLat, this.coordinateLon, this.price,
            this.apartmentType, this.rooms, this.area, this.floor,
            this.images, this.favoriteLists
        )
    }
    constructor(
        public id?: string,
        public house?: House,
        public name?: string,
        public placeType?: 'apartment',
        public placeSubType?: 'квартира',
        public coordinateLat?: number,
        public coordinateLon?: number,

        public price?: string|null,
        public apartmentType?: 'Квартира'|'Дом'|'Койко-место'|'Часть дома'|'Комната'|'Таунхаус',
        public rooms?: 'Студия'|number|null,
        public area?: number|null,
        public floor?: number|null,
        //public rating: number,
        //public facilityIds: number[],
        //public withAnimals: boolean,
        //public withChildren: boolean,
        public images: Imagee[] = [], // path: relative paths to images
        //public reviewsCnt: number,
        //public description: string,

        // TODO make lists
        public favoriteLists: FavoriteList[] = [],
    ) {
        this.coordinates = {
            get latitude(){ return coordinateLat },
            get longitude(){ return coordinateLon },
        }
    }
    get cityId(){ return this.house?.street?.city?.id }
    get city_id(){ return this.house?.street?.city?.id }
    get districtId(){ return  this.house?.districts[0]?.id }
    get streetId(){ return this.house?.street?.id }
    get houseId(){ return this.house?.id }
    get type(){ return this.placeType }
    get typeName(){ return this.placeSubType }
    coordinates
    get isFavorite(){ return this.favoriteLists.length===0 }


    //get in_favorites(){ return this.isFavorite }
    //get avg_rating(){ return this.rating }
    //get reviews_count(){ return this.reviewsCnt }
    get address(){ return 'todo: need to collect address into string' }
    get is_studio(){ return this.rooms==='Студия' }
    get rooms_count(){ return this.rooms==='Студия' ? undefined : this.rooms }
    //get checklist(){ return mapIdsToFacilities(this.facilityIds) }
    //get with_animals(){ return this.withAnimals }
    //get with_childs(){ return this.withChildren }
}
export class FavoriteList {
    public static fromFavoriteListApi(favoriteListApi?: FavoriteListApi|empty){
        const it = favoriteListApi
        if (isEmpty(it)) return undefined
        return new FavoriteList(
            it.id, it.name
        )
    }
    clone(){
        return new FavoriteList(
            this.id, this.name
        )
    }
    constructor(
        public id?: string,
        public name?: string|null,
    ) { }
}
export type Place = City|District|Street|Apartment






export type ServiceCities = ServiceData<City[]>
export const getCities = async (): Promise<ServiceCities> => {
    return apartmentsRepoMock.getCities().then(
        response => {
            const { status, data: { data, errors } } = response

            if (status!==200 || errors){
                return { error: { code: 'error' } }
            }
            
            return {
                data: data!.cities.map(it=>City.fromCityApi(it)!)
            }

            /*return {
                data: data!.cities.map(it=>({
                    id: it.id, name: it.name,
                    type: it.placeType as 'city', typeName: it.placeSubType as 'город',
                    image_path: "",
                    location: { lat: it.coordinateLat as number, lon: it.coordinateLon as number }
                }))
            }*/
        }, error => {
            //console.log("STATUS ERROR:")
            //console.log(error)
            return { error: { code: 'error' } }
        }
    )
}
/*export type ServiceCities = ServiceData<CityType[]>
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
}*/



export type ServiceDistricts = ServiceData<District[]>
export const getDistricts = async (cityId: string): Promise<ServiceDistricts> => {
    return apartmentsRepoMock.getDistricts(cityId).then(
        response => {
            const { status, data: { data, errors } } = response

            if (status!==200 || errors){
                return { error: { code: 'error' } }
            }

            return {
                data: data!.districts.map(it=>District.fromDistrictApi(it)!)
            }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}
/*export const getDistricts = async (cityId: number): Promise<ServiceDistricts> => {
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
}*/



export type ServiceStreets = ServiceData<Street[]>
export const getStreets = async (cityId: string): Promise<ServiceStreets> => {
    return apartmentsRepoMock.getStreets(cityId).then(
        response => {
            const { status, data: { data, errors } } = response

            if (status!==200 || errors){
                return { error: { code: 'error' } }
            }

            return {
                error: undefined,
                data: data!.streets.map(it=>Street.fromStreetApi(it)!)
            }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}



export type ServiceApartments = ServiceData<Apartment[]>
export const getApartments = async (options: { city_id: string }): Promise<ServiceApartments> => {
    return apartmentsRepoMock.getApartments(options.city_id).then(
        response => {
            const { status, data: { data, errors } } = response

            if (status!==200 || errors){
                return { error: { code: 'error' } }
            }

            //console.log('data:', data)
            //console.log('data:')

            return {
                data: data!.apartments.map(it=>Apartment.fromApartmentApi(it)!)//.map(it=>{console.log(it);return it})
            }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}
/*export type ServiceCoords = ServiceData<ApartmentType[]>
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
}*/



/*

export const getImage = async (img: { path: string }) => {
    return apartmentsRepoMock.getImage(img).then(
        response => {
            console.log('img:', response.data)
        },
        error => {
            console.log('error:', error)
        }
    )
}

getImage({ path: 'test-apartments-photo-1.jpg'})

*/



export const updateFavoriteApartment = async (
    apartmentId: string, favoriteListIds: string[]
)
    : Promise<ServiceData<{ success?: boolean|undefined }>> => {
    return apartmentsRepoMock.updateFavoriteApartment(apartmentId, favoriteListIds).then(
        response => {
            const { status, data: { data, errors } } = response
            //console.log("data: ",data)

            if (status!==200 || errors) return {
                error: { code: 'error' }
            }

            if (!data?.updateFavoriteApartment.success) return {
                error: { code: 'error' },
                data: data?.updateFavoriteApartment
            }

            return {
                data: data?.updateFavoriteApartment
            }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}