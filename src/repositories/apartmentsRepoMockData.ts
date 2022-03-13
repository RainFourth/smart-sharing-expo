


// Город -> Район/Округ (если есть) -> Улица/Переулок/Микрорайон -> Дома



// ГОРОДА
export type CityType = {
    id: number,
    name: string,
    type: 'city',
    typeName: 'город',
    image_path: string
    location: {
        lat: number
        lon: number
    }
}
export const cities: CityType[] = [
    {
        id: 1,
        name: 'Иркутск',
        type: 'city',
        typeName: 'город',
        image_path: '150/ffff00',
        location: {
            lat: 52.2877587086491,
            lon: 104.28070564715519,
        }
    },
    {
        id: 2,
        name: 'Ангарск',
        type: 'city',
        typeName: 'город',
        image_path: '150/00ff00',
        location: {
            lat: 52.53370613301091,
            lon: 103.90809137681815,
        }
    },
    {
        id: 3,
        name: 'Байкальск',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 51.51851402345446,
            lon: 104.1429285074065,
        }
    },
    {
        id: 4,
        name: 'Алупка',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 44.417199823683085,
            lon: 34.0417994087367,
        }
    },
    {
        id: 5,
        name: 'Алушта',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 44.672494852419554,
            lon: 34.40640283580432,
        }
    },
    {
        id: 6,
        name: 'Анапа',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 44.89091727065303,
            lon: 37.323322506378176,
        }
    },
    {
        id: 7,
        name: 'Белгород',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 50.60604395995935,
            lon: 36.571759700246666,
        }
    },
    {
        id: 8,
        name: 'Новосибирск',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 55.00353531416878,
            lon: 82.96311625403972,
        }
    },
    {
        id: 9,
        name: 'Норильск',
        type: 'city',
        typeName: 'город',
        image_path: '150/0000ff',
        location: {
            lat: 69.33167963117653,
            lon: 88.21132478337081,
        }
    },
]
export const defaultCity = cities[0]




// РАЙОНЫ / ОКРУГА
export type DistrictType = {
    id: number,
    cityId: number,
    type: 'district',
    typeName: 'район'|'округ',
    name: string,
}
export const districts: DistrictType[] = [
    {
        id: 1,
        cityId: 1,
        type: 'district',
        typeName: 'округ',
        name: 'Правобережный',
    },{
        id: 2,
        cityId: 1,
        type: 'district',
        typeName: 'округ',
        name: 'Свердловский',
    },{
        id: 3,
        cityId: 1,
        type: 'district',
        typeName: 'округ',
        name: 'Октябрьский',
    },{
        id: 4,
        cityId: 1,
        type: 'district',
        typeName: 'округ',
        name: 'Ленинский',
    },
]



// УЛИЦЫ / МИКРОРАЙОНЫ / ПЕРЕУЛКИ....
export type StreetType = {
    id: number,
    city_id: number, cityId: number,
    type: 'street',
    typeName: 'улица'|'переулок'|'микрорайон',
    name: string
}
export const streets: StreetType[] = [
    {
        id: 1,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Ленина'
    },{
        id: 2,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Рабочая'
    },{
        id: 3,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Академика Курчатова'
    },{
        id: 4,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Лермонтова'
    },{
        id: 5,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Грязнова'
    },{
        id: 6,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'улица',
        name: 'Дальневосточная'
    },{
        id: 7,
        city_id: 1, cityId: 1,
        type: 'street',
        typeName: 'переулок',
        name: 'Лагерный'
    },
]


export type PlaceType = CityType|DistrictType|StreetType


// ДОМА в которых квартиры сдаются
export type ApartmentCoordinatesType = {
    id: number
    city_id: number
    districtId: number
    streetId: number
    house: string
    price: number
    coordinates: {
        latitude: number
        longitude: number
    }
}
export const apartmentsCoordinates: ApartmentCoordinatesType[] = [
    {
        // Рабочая ул., 9, Иркутск, Иркутская обл., 664011; Правобережный округ
        id: 1,
        city_id: 1,
        districtId: 1,
        streetId: 2,
        house: '9',
        price: 2000,
        coordinates: {
            latitude: 52.29092345092127,
            longitude: 104.28558661921579
        }
    },{
        // ул. Академика Курчатова, 2А, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 2,
        city_id: 1,
        districtId: 2,
        streetId: 3,
        house: '2А',
        price: 2500,
        coordinates: {
            latitude: 52.25950934864276,
            longitude: 104.2706730216122
        }
    },{
        // ул. Академика Курчатова, 2А, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 3,
        city_id: 1,
        districtId: 2,
        streetId: 3,
        house: '2А',
        price: 1750,
        coordinates: {
            latitude: 52.25950934864276,
            longitude: 104.2706730216122
        }
    },{
        // ул. Академика Курчатова, 2Г, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 4,
        city_id: 1,
        districtId: 2,
        streetId: 3,
        house: '2Г',
        price: 3000,
        coordinates: {
            latitude: 52.25961648175772,
            longitude: 104.27164261226761
        }
    },{
        // ул. Лермонтова, 63, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 5,
        city_id: 1,
        districtId: 2,
        streetId: 4,
        house: '63',
        price: 1200,
        coordinates: {
            latitude: 52.2695564128029,
            longitude: 104.25705135414033
        }
    },{
        // ул. Грязнова, 6, Иркутск, Иркутская обл., 664003; Правобережный округ
        id: 6,
        city_id: 1,
        districtId: 1,
        streetId: 5,
        house: '6',
        price: 900,
        coordinates: {
            latitude: 52.280732361953945,
            longitude: 104.28581954952473,
        }
    },{
        // ул. Лермонтова, 63а, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 7,
        city_id: 1,
        districtId: 2,
        streetId: 4,
        house: '63а',
        price: 1999,
        coordinates: {
            latitude: 52.26931772652382,
            longitude: 104.25716968171905
        }
    },{
        // ул. Лермонтова, 63а, Иркутск, Иркутская обл., 664074; Свердловский округ
        id: 8,
        city_id: 1,
        districtId: 2,
        streetId: 4,
        house: '63а',
        price: 3560,
        coordinates: {
            latitude: 52.26931772652382,
            longitude: 104.25716968171905
        }
    },{
        // Дальневосточная ул., 152, Иркутск, Иркутская обл., 664075; Октябрьский округ
        id: 9,
        city_id: 1,
        districtId: 3,
        streetId: 6,
        house: '152',
        price: 4000,
        coordinates: {
            latitude: 52.25250272180238,
            longitude: 104.31992279713974,
        }
    },{
        // пер. Лагерный, 4, Иркутск, Иркутская обл., 664009; Правобережный округ
        id: 10,
        city_id: 1,
        districtId: 1,
        streetId: 7,
        house: '4',
        price: 1200,
        coordinates: {
            latitude: 52.28361539615834,
            longitude: 104.33078684710043,
        }
    },{
        // ул. Ленина, 22, Иркутск, Иркутская обл., 664025; Правобережный округ
        id: 11,
        city_id: 1,
        districtId: 1,
        streetId: 1,
        house: '22',
        price: 1600,
        coordinates: {
            latitude: 52.28291229720827,
            longitude: 104.28052646947768,
        }
    },
]